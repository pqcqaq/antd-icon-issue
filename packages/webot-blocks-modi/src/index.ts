import * as ts from "typescript";
import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { createServer } from "vite";
import chokidar from "chokidar";

const { factory } = ts;
const webRoot = join(process.cwd(), "./src");
const blockRoot = join(webRoot, "blocks");

function collectBlocks() {
    const brDir = readdirSync(blockRoot);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const subDirs = brDir.filter((dir) =>
        statSync(join(blockRoot, dir)).isDirectory(),
    );

    // 为每个子目录创建 index.ts
    subDirs.forEach((group) => {
        const groupDirPath = join(blockRoot, group);
        const files = readdirSync(groupDirPath);

        const tsxFiles = files
            .filter((ele) => ele.endsWith(".tsx"))
            .map((ele) => ele.slice(0, ele.indexOf(".")));
        const indexFile = "index.ts";

        if (!files.includes(indexFile)) {
            writeFileSync(join(groupDirPath, indexFile), "", { flag: "w" });
            console.log(`Created empty index.ts in ${groupDirPath}`);
        }

        const statements = [
            factory.createImportDeclaration(
                undefined,
                factory.createImportClause(
                    false,
                    undefined,
                    factory.createNamedImports([
                        factory.createImportSpecifier(
                            false,
                            undefined,
                            factory.createIdentifier("BlockDef"),
                        ),
                    ]),
                ),
                factory.createStringLiteral("webot-core/lib/types/Block"),
                undefined,
            ),
            ...tsxFiles.map((file) =>
                factory.createImportDeclaration(
                    undefined,
                    factory.createImportClause(
                        false,
                        undefined,
                        factory.createNamespaceImport(
                            factory.createIdentifier(file),
                        ),
                    ),
                    factory.createStringLiteral(`./${file}`),
                    undefined,
                ),
            ),
            factory.createExportAssignment(
                undefined,
                undefined,
                factory.createAsExpression(
                    factory.createArrayLiteralExpression(
                        tsxFiles.map((file) => factory.createIdentifier(file)),
                        true,
                    ),
                    factory.createArrayTypeNode(
                        factory.createTypeReferenceNode(
                            factory.createIdentifier("BlockDef"),
                            undefined,
                        ),
                    ),
                ),
            ),
        ];

        const result = printer.printList(
            ts.ListFormat.SourceFileStatements,
            factory.createNodeArray(statements),
            ts.createSourceFile("temp.tsx", "", ts.ScriptTarget.ES2015),
        );

        writeFileSync(join(groupDirPath, indexFile), result, { flag: "w" });
    });

    // 创建主 index.ts
    const mainIndexStatements = [
        ...subDirs.map((dir) =>
            factory.createImportDeclaration(
                undefined,
                factory.createImportClause(
                    false,
                    factory.createIdentifier(dir),
                    undefined,
                ),
                factory.createStringLiteral(`./${dir}`),
                undefined,
            ),
        ),
        factory.createVariableStatement(
            [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            factory.createVariableDeclarationList(
                [
                    factory.createVariableDeclaration(
                        factory.createIdentifier("groups"),
                        undefined,
                        undefined,
                        factory.createArrayLiteralExpression(
                            subDirs.map((dir) => {
                                let name = dir;
                                try {
                                    const metaPath = join(
                                        blockRoot,
                                        dir,
                                        "meta.json",
                                    );
                                    const meta = JSON.parse(
                                        readFileSync(metaPath, "utf8"),
                                    );
                                    name = meta.name || dir;
                                } catch (e) {
                                    console.log(
                                        `No meta.json found for ${dir}, using directory name`,
                                        e,
                                    );
                                }
                                return factory.createObjectLiteralExpression(
                                    [
                                        factory.createPropertyAssignment(
                                            factory.createIdentifier("name"),
                                            factory.createStringLiteral(name),
                                        ),
                                        factory.createPropertyAssignment(
                                            factory.createIdentifier("blocks"),
                                            factory.createIdentifier(dir),
                                        ),
                                    ],
                                    true,
                                );
                            }),
                            true,
                        ),
                    ),
                ],
                ts.NodeFlags.Const,
            ),
        ),
    ];

    const mainIndexResult = printer.printList(
        ts.ListFormat.SourceFileStatements,
        factory.createNodeArray(mainIndexStatements),
        ts.createSourceFile("temp.tsx", "", ts.ScriptTarget.ES2015),
    );

    writeFileSync(join(blockRoot, "index.ts"), mainIndexResult, { flag: "w" });
    console.log(`Created main index.ts in ${blockRoot}`);
}

const watcher = chokidar.watch(blockRoot, {
    persistent: true,
    ignoreInitial: true,
    ignored: [/node_modules/, /\.git/, /\.idea/, /index.ts/],
});

watcher
    .on("add", (path) => {
        console.log(`File ${path} has been added`);
        collectBlocks();
    })
    .on("change", (path) => {
        console.log(`File ${path} has been changed`);
        collectBlocks();
    })
    .on("unlink", (path) => {
        console.log(`File ${path} has been removed`);
        collectBlocks();
    });

async function main() {
    collectBlocks();
    const server = await createServer({
        // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
        configFile: false,
        root: webRoot,
        server: {
            host: "0.0.0.0",
            origin: "*",
            port: 1337,
        },
    });
    await server.listen();

    server.printUrls();
    server.bindCLIShortcuts({ print: true });
}

main();
