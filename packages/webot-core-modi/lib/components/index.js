import React, { useEffect, useState, useRef, useMemo, memo } from "react";
import Array from "./base/Array.js";
import Button from "./base/Button.js";
import Icon from "./base/Icon.js";
import Image from "./base/Image.js";
import Menu from "./base/Menu.js";
import Text from "./base/Text.js";
import Background from "./base/Background.js";
import styled, { keyframes } from "styled-components";
import Accordion from "./complx/Accordion.js";
import Carousel from "./complx/Carousel.js";
import Counter from "./complx/Counter.js";
import Navbar from "./complx/NavBar.js";
import NavItem from "./complx/NavItem.js";
import SideBar from "./complx/SideBar.js";
import SideMenu from "./complx/SideMenu.js";
import ListCarousel from "./complx/ListCarousel.js";
const componentsImportMap = {
    // React
    React,
    useEffect,
    useState,
    useRef,
    useMemo,
    memo,
    // base
    Array,
    Button,
    Icon,
    Image,
    Menu,
    Text,
    Background,
    // complx
    Accordion,
    Carousel,
    Counter,
    Navbar,
    NavItem,
    SideBar,
    SideMenu,
    ListCarousel,
    // others
    styled,
    keyframes,
};
export default componentsImportMap;
