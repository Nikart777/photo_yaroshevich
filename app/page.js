'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Mail, ArrowRight, Play, ExternalLink } from 'lucide-react';

// --- UTILS ---

// Безопасная функция для улучшения качества изображений Wix
const getWixImageUrl = (src, targetWidth) => {
  if (!src) return '';
  // Если это не Wix или ссылка странная, возвращаем как есть, чтобы не сломать
  if (typeof src !== 'string' || !src.includes('wixstatic.com')) return src;

  try {
    // Ищем текущие размеры в URL (формат Wix: w_490,h_615)
    const match = src.match(/w_(\d+),h_(\d+)/);
    
    // Если не нашли размеры в URL, возвращаем оригинал
    if (!match) return src;

    const [_, w, h] = match;
    const currentWidth = parseInt(w);
    const currentHeight = parseInt(h);
    
    // Защита от деления на ноль
    if (currentWidth === 0) return src;

    // Считаем пропорции
    const aspectRatio = currentHeight / currentWidth;
    const newHeight = Math.round(targetWidth * aspectRatio);

    // Заменяем размеры и качество
    return src
      .replace(/w_\d+,h_\d+/, `w_${targetWidth},h_${newHeight}`)
      .replace(/q_\d+/, 'q_90');
  } catch (e) {
    console.error("Error processing image URL:", src, e);
    return src; // В случае любой ошибки возвращаем оригинал
  }
};

// --- DATA ---
const portfolioData = {
  "fashion-beauty": [
    { "id": 1, "src": "https://static.wixstatic.com/media/58e6a0_831ae797a52a4118bac0ba8076db1215~mv2.jpg/v1/fill/w_490,h_615,q_85,enc_avif,quality_auto/58e6a0_831ae797a52a4118bac0ba8076db1215~mv2.jpg", "title": "Project 1", "year": "2023" },
    { "id": 2, "src": "https://static.wixstatic.com/media/58e6a0_17423af8f60243398321687a0ed1014c~mv2.jpg/v1/fill/w_489,h_614,q_85,enc_avif,quality_auto/58e6a0_17423af8f60243398321687a0ed1014c~mv2.jpg", "title": "Project 2", "year": "2023" },
    { "id": 3, "src": "https://static.wixstatic.com/media/58e6a0_54cf0d7db4d6480a9c818e91a6c2bbc9~mv2.jpg/v1/fill/w_489,h_614,q_85,enc_avif,quality_auto/58e6a0_54cf0d7db4d6480a9c818e91a6c2bbc9~mv2.jpg", "title": "Project 3", "year": "2023" },
    { "id": 4, "src": "https://static.wixstatic.com/media/58e6a0_4bd6065670df4893b60e20aa0105d4f2~mv2.jpg/v1/fill/w_490,h_615,q_85,enc_avif,quality_auto/58e6a0_4bd6065670df4893b60e20aa0105d4f2~mv2.jpg", "title": "Project 4", "year": "2023" },
    { "id": 5, "src": "https://static.wixstatic.com/media/58e6a0_6320866166cd4de9aabe43676c41b239~mv2.jpg/v1/fill/w_489,h_614,q_85,enc_avif,quality_auto/58e6a0_6320866166cd4de9aabe43676c41b239~mv2.jpg", "title": "Project 5", "year": "2023" },
    { "id": 6, "src": "https://static.wixstatic.com/media/58e6a0_d5973e5382ed49d2b937d698cf114ef7~mv2.jpg/v1/fill/w_490,h_615,q_85,enc_avif,quality_auto/58e6a0_d5973e5382ed49d2b937d698cf114ef7~mv2.jpg", "title": "Project 6", "year": "2023" },
    { "id": 7, "src": "https://static.wixstatic.com/media/58e6a0_cdab1bb2ddef4b5880c15f8420acf8fa~mv2.jpg/v1/fill/w_489,h_614,q_85,enc_avif,quality_auto/58e6a0_cdab1bb2ddef4b5880c15f8420acf8fa~mv2.jpg", "title": "Project 7", "year": "2023" },
    { "id": 8, "src": "https://static.wixstatic.com/media/58e6a0_149d0a00a08247cf88728ccb376687ff~mv2.jpg/v1/fill/w_490,h_615,q_85,enc_avif,quality_auto/58e6a0_149d0a00a08247cf88728ccb376687ff~mv2.jpg", "title": "Project 8", "year": "2023" },
    { "id": 9, "src": "https://static.wixstatic.com/media/58e6a0_133aa81023534417b7102426632d0835~mv2.jpg/v1/fill/w_489,h_614,q_85,enc_avif,quality_auto/58e6a0_133aa81023534417b7102426632d0835~mv2.jpg", "title": "Project 9", "year": "2023" },
    { "id": 10, "src": "https://static.wixstatic.com/media/58e6a0_3dbdc87bf2cc4845a3aa91d454913e9c~mv2.jpg/v1/fill/w_490,h_615,q_85,enc_avif,quality_auto/58e6a0_3dbdc87bf2cc4845a3aa91d454913e9c~mv2.jpg", "title": "Project 10", "year": "2023" },
    { "id": 11, "src": "https://static.wixstatic.com/media/58e6a0_5aed22273a134c43bca18880843fe15c~mv2.jpg/v1/fill/w_489,h_378,q_85,enc_avif,quality_auto/58e6a0_5aed22273a134c43bca18880843fe15c~mv2.jpg", "title": "Project 11", "year": "2023" },
    { "id": 12, "src": "https://static.wixstatic.com/media/58e6a0_44d9abb05b7941868cd94b17fb10939f~mv2.jpg/v1/fill/w_490,h_379,q_85,enc_avif,quality_auto/58e6a0_44d9abb05b7941868cd94b17fb10939f~mv2.jpg", "title": "Project 12", "year": "2023" },
    { "id": 13, "src": "https://static.wixstatic.com/media/58e6a0_a8f0e74d908941da9575dadbe16f9f38~mv2.jpg/v1/fill/w_489,h_614,q_85,enc_avif,quality_auto/58e6a0_a8f0e74d908941da9575dadbe16f9f38~mv2.jpg", "title": "Project 13", "year": "2023" },
    { "id": 14, "src": "https://static.wixstatic.com/media/58e6a0_3c8a0d5473ef434f8754b45481ede5fc~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_3c8a0d5473ef434f8754b45481ede5fc~mv2.jpg", "title": "Project 14", "year": "2023" },
    { "id": 15, "src": "https://static.wixstatic.com/media/58e6a0_6e568c3c960f4563ad611b85241fa1e0~mv2.jpg/v1/fill/w_489,h_667,q_85,enc_avif,quality_auto/58e6a0_6e568c3c960f4563ad611b85241fa1e0~mv2.jpg", "title": "Project 15", "year": "2023" },
    { "id": 16, "src": "https://static.wixstatic.com/media/58e6a0_b6e3c17e126a4bad9b058f92c1af0bf7~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_b6e3c17e126a4bad9b058f92c1af0bf7~mv2.jpg", "title": "Project 16", "year": "2023" },
    { "id": 17, "src": "https://static.wixstatic.com/media/58e6a0_d71b75e4c8b74c5fa0a6b8303383100b~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_d71b75e4c8b74c5fa0a6b8303383100b~mv2.jpg", "title": "Project 17", "year": "2023" },
    { "id": 18, "src": "https://static.wixstatic.com/media/58e6a0_c204cf2047394a08af1b2f4e1ee51a15~mv2.jpg/v1/fill/w_489,h_324,q_85,enc_avif,quality_auto/58e6a0_c204cf2047394a08af1b2f4e1ee51a15~mv2.jpg", "title": "Project 18", "year": "2023" },
    { "id": 19, "src": "https://static.wixstatic.com/media/58e6a0_92fd3128420e45bb8527c457b040f4f1~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_92fd3128420e45bb8527c457b040f4f1~mv2.jpg", "title": "Project 19", "year": "2023" },
    { "id": 20, "src": "https://static.wixstatic.com/media/58e6a0_d132411b803e46c9951623fabf6f6d75~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_d132411b803e46c9951623fabf6f6d75~mv2.jpg", "title": "Project 20", "year": "2023" },
    { "id": 21, "src": "https://static.wixstatic.com/media/58e6a0_23796cf841f44d98a52d035d81807909~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_23796cf841f44d98a52d035d81807909~mv2.jpg", "title": "Project 21", "year": "2023" },
    { "id": 22, "src": "https://static.wixstatic.com/media/58e6a0_74e13899f716483c962d0a34a2681af0~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_74e13899f716483c962d0a34a2681af0~mv2.jpg", "title": "Project 22", "year": "2023" },
    { "id": 23, "src": "https://static.wixstatic.com/media/58e6a0_47921a4ac6704d3ab778cda5fa37134d~mv2.jpg/v1/fill/w_489,h_737,q_85,enc_avif,quality_auto/58e6a0_47921a4ac6704d3ab778cda5fa37134d~mv2.jpg", "title": "Project 23", "year": "2023" },
    { "id": 24, "src": "https://static.wixstatic.com/media/58e6a0_5a347cc7b81f4d15a243cf08354bf8ce~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_5a347cc7b81f4d15a243cf08354bf8ce~mv2.jpg", "title": "Project 24", "year": "2023" },
    { "id": 25, "src": "https://static.wixstatic.com/media/58e6a0_5480bb3a08634688bdaafd4d55d2cfa7~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_5480bb3a08634688bdaafd4d55d2cfa7~mv2.jpg", "title": "Project 25", "year": "2023" },
    { "id": 26, "src": "https://static.wixstatic.com/media/58e6a0_73e7f3bfa45640e38b8d3f425a9533f9~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_73e7f3bfa45640e38b8d3f425a9533f9~mv2.jpg", "title": "Project 26", "year": "2023" },
    { "id": 27, "src": "https://static.wixstatic.com/media/58e6a0_acdd75e480224af2b7eaa58c5196567d~mv2.jpg/v1/fill/w_489,h_640,q_85,enc_avif,quality_auto/58e6a0_acdd75e480224af2b7eaa58c5196567d~mv2.jpg", "title": "Project 27", "year": "2023" },
    { "id": 28, "src": "https://static.wixstatic.com/media/58e6a0_19bf4db03022479abc8cd91eb0c7fc14~mv2.jpg/v1/fill/w_490,h_642,q_85,enc_avif,quality_auto/58e6a0_19bf4db03022479abc8cd91eb0c7fc14~mv2.jpg", "title": "Project 28", "year": "2023" },
    { "id": 29, "src": "https://static.wixstatic.com/media/58e6a0_f5319ff0c3f849d39e8f55a3374ffae9~mv2.jpg/v1/fill/w_489,h_373,q_85,enc_avif,quality_auto/58e6a0_f5319ff0c3f849d39e8f55a3374ffae9~mv2.jpg", "title": "Project 29", "year": "2023" },
    { "id": 30, "src": "https://static.wixstatic.com/media/58e6a0_9968b1da06d64168b7b0ee3aa85be83c~mv2.jpg/v1/fill/w_490,h_642,q_85,enc_avif,quality_auto/58e6a0_9968b1da06d64168b7b0ee3aa85be83c~mv2.jpg", "title": "Project 30", "year": "2023" },
    { "id": 31, "src": "https://static.wixstatic.com/media/58e6a0_cea431053bda4ca18070464b4365c2b4~mv2.jpg/v1/fill/w_489,h_373,q_85,enc_avif,quality_auto/58e6a0_cea431053bda4ca18070464b4365c2b4~mv2.jpg", "title": "Project 31", "year": "2023" },
    { "id": 32, "src": "https://static.wixstatic.com/media/58e6a0_854e9c1cfd97481c888c8e9862c738a0~mv2.jpg/v1/fill/w_489,h_640,q_85,enc_avif,quality_auto/58e6a0_854e9c1cfd97481c888c8e9862c738a0~mv2.jpg", "title": "Project 32", "year": "2023" },
    { "id": 33, "src": "https://static.wixstatic.com/media/58e6a0_c239db3eb2304e09acef972f4c406aac~mv2.jpg/v1/fill/w_490,h_671,q_85,enc_avif,quality_auto/58e6a0_c239db3eb2304e09acef972f4c406aac~mv2.jpg", "title": "Project 33", "year": "2023" },
    { "id": 34, "src": "https://static.wixstatic.com/media/58e6a0_8265f038c9974d4ea8f77dab8bc2988f~mv2.jpg/v1/fill/w_489,h_378,q_85,enc_avif,quality_auto/58e6a0_8265f038c9974d4ea8f77dab8bc2988f~mv2.jpg", "title": "Project 34", "year": "2023" },
    { "id": 35, "src": "https://static.wixstatic.com/media/58e6a0_dd7c258af29b4892b7cfca4c8a90da32~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_dd7c258af29b4892b7cfca4c8a90da32~mv2.jpg", "title": "Project 35", "year": "2023" },
    { "id": 36, "src": "https://static.wixstatic.com/media/58e6a0_197a01d85da84971ba15931c85a42234~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_197a01d85da84971ba15931c85a42234~mv2.jpg", "title": "Project 36", "year": "2023" },
    { "id": 37, "src": "https://static.wixstatic.com/media/58e6a0_1dea84923e6d400abf31f3025089de0a~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_1dea84923e6d400abf31f3025089de0a~mv2.jpg", "title": "Project 37", "year": "2023" },
    { "id": 38, "src": "https://static.wixstatic.com/media/58e6a0_46c4427873a4471bbbb65ab3aa352e84~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_46c4427873a4471bbbb65ab3aa352e84~mv2.jpg", "title": "Project 38", "year": "2023" },
    { "id": 39, "src": "https://static.wixstatic.com/media/58e6a0_76b69bc67e3141d48797eddd00e21ee9~mv2.jpg/v1/fill/w_490,h_379,q_85,enc_avif,quality_auto/58e6a0_76b69bc67e3141d48797eddd00e21ee9~mv2.jpg", "title": "Project 39", "year": "2023" },
    { "id": 40, "src": "https://static.wixstatic.com/media/58e6a0_b4671487a82745f4865721406cb54751~mv2.jpg/v1/fill/w_489,h_378,q_85,enc_avif,quality_auto/58e6a0_b4671487a82745f4865721406cb54751~mv2.jpg", "title": "Project 40", "year": "2023" },
    { "id": 41, "src": "https://static.wixstatic.com/media/58e6a0_d4db803aad55439ea3a3985696917246~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_d4db803aad55439ea3a3985696917246~mv2.jpg", "title": "Project 41", "year": "2023" },
    { "id": 42, "src": "https://static.wixstatic.com/media/58e6a0_1c506b58e2504c89ada666ede7a374c9~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_1c506b58e2504c89ada666ede7a374c9~mv2.jpg", "title": "Project 42", "year": "2023" },
    { "id": 43, "src": "https://static.wixstatic.com/media/58e6a0_09ccb7a599954896bd90dbb86d45701f~mv2.jpg/v1/fill/w_490,h_362,q_85,enc_avif,quality_auto/58e6a0_09ccb7a599954896bd90dbb86d45701f~mv2.jpg", "title": "Project 43", "year": "2023" },
    { "id": 44, "src": "https://static.wixstatic.com/media/58e6a0_feab9534e95946738e456f4bbf6a1f1b~mv2.jpg/v1/fill/w_489,h_361,q_85,enc_avif,quality_auto/58e6a0_feab9534e95946738e456f4bbf6a1f1b~mv2.jpg", "title": "Project 44", "year": "2023" },
    { "id": 45, "src": "https://static.wixstatic.com/media/58e6a0_7949568769a944789224ba7d41103f41~mv2.jpg/v1/fill/w_490,h_680,q_85,enc_avif,quality_auto/58e6a0_7949568769a944789224ba7d41103f41~mv2.jpg", "title": "Project 45", "year": "2023" },
    { "id": 46, "src": "https://static.wixstatic.com/media/58e6a0_92f1a846a03b4fedb1ed644acac20023~mv2.jpg/v1/fill/w_489,h_668,q_85,enc_avif,quality_auto/58e6a0_92f1a846a03b4fedb1ed644acac20023~mv2.jpg", "title": "Project 46", "year": "2023" },
    { "id": 47, "src": "https://static.wixstatic.com/media/58e6a0_45083d3645bc41369022d8fffdff523b~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_45083d3645bc41369022d8fffdff523b~mv2.jpg", "title": "Project 47", "year": "2023" },
    { "id": 48, "src": "https://static.wixstatic.com/media/58e6a0_985dc727bd044cd4845932504b8c9bff~mv2.jpg/v1/fill/w_489,h_359,q_85,enc_avif,quality_auto/58e6a0_985dc727bd044cd4845932504b8c9bff~mv2.jpg", "title": "Project 48", "year": "2023" },
    { "id": 49, "src": "https://static.wixstatic.com/media/58e6a0_b13d54d5b6fb47e087a459d6513c8412~mv2.jpg/v1/fill/w_489,h_670,q_85,enc_avif,quality_auto/58e6a0_b13d54d5b6fb47e087a459d6513c8412~mv2.jpg", "title": "Project 49", "year": "2023" },
    { "id": 50, "src": "https://static.wixstatic.com/media/58e6a0_f34f32ee7e4747f487034715eb1ad2b3~mv2.jpg/v1/fill/w_490,h_355,q_85,enc_avif,quality_auto/58e6a0_f34f32ee7e4747f487034715eb1ad2b3~mv2.jpg", "title": "Project 50", "year": "2023" },
    { "id": 51, "src": "https://static.wixstatic.com/media/58e6a0_988faee6e52b487a93024083c0538b38~mv2.jpg/v1/fill/w_490,h_670,q_85,enc_avif,quality_auto/58e6a0_988faee6e52b487a93024083c0538b38~mv2.jpg", "title": "Project 51", "year": "2023" },
    { "id": 52, "src": "https://static.wixstatic.com/media/58e6a0_b690d80dd2304364b070795dca3ad72f~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_b690d80dd2304364b070795dca3ad72f~mv2.jpg", "title": "Project 52", "year": "2023" },
    { "id": 53, "src": "https://static.wixstatic.com/media/58e6a0_25e9204b473241e9a4fbc9a0cc2eee19~mv2.jpg/v1/fill/w_490,h_668,q_85,enc_avif,quality_auto/58e6a0_25e9204b473241e9a4fbc9a0cc2eee19~mv2.jpg", "title": "Project 53", "year": "2023" },
    { "id": 54, "src": "https://static.wixstatic.com/media/58e6a0_c3479a7bee0d4d95b9edf60d594e6b22~mv2.jpg/v1/fill/w_489,h_666,q_85,enc_avif,quality_auto/58e6a0_c3479a7bee0d4d95b9edf60d594e6b22~mv2.jpg", "title": "Project 54", "year": "2023" },
    { "id": 55, "src": "https://static.wixstatic.com/media/58e6a0_aea8b8ace24e4f4c810aa36cf140e2c2~mv2.jpg/v1/fill/w_490,h_675,q_85,enc_avif,quality_auto/58e6a0_aea8b8ace24e4f4c810aa36cf140e2c2~mv2.jpg", "title": "Project 55", "year": "2023" },
    { "id": 56, "src": "https://static.wixstatic.com/media/58e6a0_14f52a2119324aa981c9cee7d6ca9d86~mv2.jpg/v1/fill/w_489,h_691,q_85,enc_avif,quality_auto/58e6a0_14f52a2119324aa981c9cee7d6ca9d86~mv2.jpg", "title": "Project 56", "year": "2023" },
    { "id": 57, "src": "https://static.wixstatic.com/media/58e6a0_46131863628b44e18c57d34cd5692134~mv2.jpg/v1/fill/w_490,h_363,q_85,enc_avif,quality_auto/58e6a0_46131863628b44e18c57d34cd5692134~mv2.jpg", "title": "Project 57", "year": "2023" },
    { "id": 58, "src": "https://static.wixstatic.com/media/58e6a0_a6e6f4dc226a452fb0e11a71d35eccf8~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_a6e6f4dc226a452fb0e11a71d35eccf8~mv2.jpg", "title": "Project 58", "year": "2023" },
    { "id": 59, "src": "https://static.wixstatic.com/media/58e6a0_343bd322703443abac2513de71751978~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_343bd322703443abac2513de71751978~mv2.jpg", "title": "Project 59", "year": "2023" },
    { "id": 60, "src": "https://static.wixstatic.com/media/58e6a0_09f394d08b5340fe84013688a0ec048b~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_09f394d08b5340fe84013688a0ec048b~mv2.jpg", "title": "Project 60", "year": "2023" },
    { "id": 61, "src": "https://static.wixstatic.com/media/58e6a0_cfa339d9649b4168bfc49360a3552826~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_cfa339d9649b4168bfc49360a3552826~mv2.jpg", "title": "Project 61", "year": "2023" },
    { "id": 62, "src": "https://static.wixstatic.com/media/58e6a0_bf8c79c4656a4943898e7e02e8f4ea60~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_bf8c79c4656a4943898e7e02e8f4ea60~mv2.jpg", "title": "Project 62", "year": "2023" },
    { "id": 63, "src": "https://static.wixstatic.com/media/58e6a0_c2da24548d9e4b6f8a439cd1fe2d73e9~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_c2da24548d9e4b6f8a439cd1fe2d73e9~mv2.jpg", "title": "Project 63", "year": "2023" },
    { "id": 64, "src": "https://static.wixstatic.com/media/58e6a0_34330fea669f40c1a119f128bc7b2faf~mv2.jpg/v1/fill/w_489,h_326,q_85,enc_avif,quality_auto/58e6a0_34330fea669f40c1a119f128bc7b2faf~mv2.jpg", "title": "Project 64", "year": "2023" },
    { "id": 65, "src": "https://static.wixstatic.com/media/58e6a0_593f2424d99340d58a97d02b8fb6efcf~mv2.jpg/v1/fill/w_490,h_735,q_85,enc_avif,quality_auto/58e6a0_593f2424d99340d58a97d02b8fb6efcf~mv2.jpg", "title": "Project 65", "year": "2023" },
    { "id": 66, "src": "https://static.wixstatic.com/media/58e6a0_489e1e467de148db872380632638f598~mv2.jpg/v1/fill/w_489,h_677,q_85,enc_avif,quality_auto/58e6a0_489e1e467de148db872380632638f598~mv2.jpg", "title": "Project 66", "year": "2023" }
  ],
  "advertising": [
    { "id": 1, "src": "https://static.wixstatic.com/media/58e6a0_5c1c202255a44b0c970728c91043181f~mv2.jpg/v1/fill/w_490,h_327,q_85,enc_avif,quality_auto/58e6a0_5c1c202255a44b0c970728c91043181f~mv2.jpg", "title": "Project 1", "year": "2023" },
    { "id": 2, "src": "https://static.wixstatic.com/media/58e6a0_f4506c959f7843a59fa00c7516c681d6~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_f4506c959f7843a59fa00c7516c681d6~mv2.jpg", "title": "Project 2", "year": "2023" },
    { "id": 3, "src": "https://static.wixstatic.com/media/58e6a0_823a46bf963b4117939857c9911ec69b~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_823a46bf963b4117939857c9911ec69b~mv2.jpg", "title": "Project 3", "year": "2023" },
    { "id": 4, "src": "https://static.wixstatic.com/media/58e6a0_eb40d6da0a6e43f189831a0d04e364b7~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_eb40d6da0a6e43f189831a0d04e364b7~mv2.jpg", "title": "Project 4", "year": "2023" },
    { "id": 5, "src": "https://static.wixstatic.com/media/58e6a0_2b9281dd4e264387a964cc3dc87ca637~mv2.jpg/v1/fill/w_490,h_653,q_85,enc_avif,quality_auto/58e6a0_2b9281dd4e264387a964cc3dc87ca637~mv2.jpg", "title": "Project 5", "year": "2023" },
    { "id": 6, "src": "https://static.wixstatic.com/media/58e6a0_a206f6e6d3694f538274f93da0366765~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_a206f6e6d3694f538274f93da0366765~mv2.jpg", "title": "Project 6", "year": "2023" },
    { "id": 7, "src": "https://static.wixstatic.com/media/58e6a0_eb7bd7cadd3945bc8714cc7c9df0c696~mv2.jpg/v1/fill/w_490,h_327,q_85,enc_avif,quality_auto/58e6a0_eb7bd7cadd3945bc8714cc7c9df0c696~mv2.jpg", "title": "Project 7", "year": "2023" },
    { "id": 8, "src": "https://static.wixstatic.com/media/58e6a0_b90cc3822d1b436c98951db9bdde08d8~mv2.jpg/v1/fill/w_489,h_364,q_85,enc_avif,quality_auto/58e6a0_b90cc3822d1b436c98951db9bdde08d8~mv2.jpg", "title": "Project 8", "year": "2023" },
    { "id": 9, "src": "https://static.wixstatic.com/media/58e6a0_b1d2aef389494b2886b95293b46e20d7~mv2.jpg/v1/fill/w_490,h_340,q_85,enc_avif,quality_auto/58e6a0_b1d2aef389494b2886b95293b46e20d7~mv2.jpg", "title": "Project 9", "year": "2023" },
    { "id": 10, "src": "https://static.wixstatic.com/media/58e6a0_1f485963dab440929e8da6cd3c65ddc5~mv2.jpg/v1/fill/w_489,h_318,q_85,enc_avif,quality_auto/58e6a0_1f485963dab440929e8da6cd3c65ddc5~mv2.jpg", "title": "Project 10", "year": "2023" },
    { "id": 11, "src": "https://static.wixstatic.com/media/58e6a0_da7e647252d648778ecef193d3928085~mv2.jpg/v1/fill/w_490,h_735,q_85,enc_avif,quality_auto/58e6a0_da7e647252d648778ecef193d3928085~mv2.jpg", "title": "Project 11", "year": "2023" },
    { "id": 12, "src": "https://static.wixstatic.com/media/58e6a0_2b9152cd16d44c14b68ab7950ec6a214~mv2.jpg/v1/fill/w_489,h_349,q_85,enc_avif,quality_auto/58e6a0_2b9152cd16d44c14b68ab7950ec6a214~mv2.jpg", "title": "Project 12", "year": "2023" },
    { "id": 13, "src": "https://static.wixstatic.com/media/58e6a0_998d837ac2c9457680c655147edcbdd8~mv2.jpg/v1/fill/w_489,h_695,q_85,enc_avif,quality_auto/58e6a0_998d837ac2c9457680c655147edcbdd8~mv2.jpg", "title": "Project 13", "year": "2023" },
    { "id": 14, "src": "https://static.wixstatic.com/media/58e6a0_813aae5783104d7c816a6c36e0fd336b~mv2.jpg/v1/fill/w_490,h_317,q_85,enc_avif,quality_auto/58e6a0_813aae5783104d7c816a6c36e0fd336b~mv2.jpg", "title": "Project 14", "year": "2023" },
    { "id": 15, "src": "https://static.wixstatic.com/media/58e6a0_94360c77a4e24731a23d5dc27829b7d8~mv2.jpg/v1/fill/w_490,h_317,q_85,enc_avif,quality_auto/58e6a0_94360c77a4e24731a23d5dc27829b7d8~mv2.jpg", "title": "Project 15", "year": "2023" },
    { "id": 16, "src": "https://static.wixstatic.com/media/58e6a0_e68a206aab2244cdac226870a038653b~mv2.jpg/v1/fill/w_489,h_316,q_85,enc_avif,quality_auto/58e6a0_e68a206aab2244cdac226870a038653b~mv2.jpg", "title": "Project 16", "year": "2023" },
    { "id": 17, "src": "https://static.wixstatic.com/media/58e6a0_09a0c1adeab34680b0c3acdc158cc9f4~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_09a0c1adeab34680b0c3acdc158cc9f4~mv2.jpg", "title": "Project 17", "year": "2023" },
    { "id": 18, "src": "https://static.wixstatic.com/media/58e6a0_344cecc2ae994cf6961a21b957dbb06c~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_344cecc2ae994cf6961a21b957dbb06c~mv2.jpg", "title": "Project 18", "year": "2023" },
    { "id": 19, "src": "https://static.wixstatic.com/media/58e6a0_55df4287016242b8acae3db5a7e4afb7~mv2.jpg/v1/fill/w_490,h_379,q_85,enc_avif,quality_auto/58e6a0_55df4287016242b8acae3db5a7e4afb7~mv2.jpg", "title": "Project 19", "year": "2023" },
    { "id": 20, "src": "https://static.wixstatic.com/media/58e6a0_27bdf5f32a62483b81bddb5327031a2d~mv2.jpg/v1/fill/w_489,h_378,q_85,enc_avif,quality_auto/58e6a0_27bdf5f32a62483b81bddb5327031a2d~mv2.jpg", "title": "Project 20", "year": "2023" },
    { "id": 21, "src": "https://static.wixstatic.com/media/58e6a0_84c387d0d25c4c608e80d5cdbbc26c2a~mv2.jpg/v1/fill/w_490,h_634,q_85,enc_avif,quality_auto/58e6a0_84c387d0d25c4c608e80d5cdbbc26c2a~mv2.jpg", "title": "Project 21", "year": "2023" },
    { "id": 22, "src": "https://static.wixstatic.com/media/58e6a0_6c2c64a734cd48beacace2e70e7188cb~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_6c2c64a734cd48beacace2e70e7188cb~mv2.jpg", "title": "Project 22", "year": "2023" },
    { "id": 23, "src": "https://static.wixstatic.com/media/58e6a0_5d5d4f7b351f45a78afa40b61202af1f~mv2.jpg/v1/fill/w_490,h_327,q_85,enc_avif,quality_auto/58e6a0_5d5d4f7b351f45a78afa40b61202af1f~mv2.jpg", "title": "Project 23", "year": "2023" },
    { "id": 24, "src": "https://static.wixstatic.com/media/58e6a0_a8868893f88a4b31878161e9dbc95a3e~mv2.jpg/v1/fill/w_489,h_633,q_85,enc_avif,quality_auto/58e6a0_a8868893f88a4b31878161e9dbc95a3e~mv2.jpg", "title": "Project 24", "year": "2023" },
    { "id": 25, "src": "https://static.wixstatic.com/media/58e6a0_a81fed922fb248aa8b2f9cd6a151d825~mv2.jpg/v1/fill/w_490,h_365,q_85,enc_avif,quality_auto/58e6a0_a81fed922fb248aa8b2f9cd6a151d825~mv2.jpg", "title": "Project 25", "year": "2023" },
    { "id": 26, "src": "https://static.wixstatic.com/media/58e6a0_edf69ee841af465cb543594d5e80fca9~mv2.jpg/v1/fill/w_490,h_327,q_85,enc_avif,quality_auto/58e6a0_edf69ee841af465cb543594d5e80fca9~mv2.jpg", "title": "Project 26", "year": "2023" },
    { "id": 27, "src": "https://static.wixstatic.com/media/58e6a0_fe5ffa6bf6a0457995ebf7baae179873~mv2.jpg/v1/fill/w_489,h_326,q_85,enc_avif,quality_auto/58e6a0_fe5ffa6bf6a0457995ebf7baae179873~mv2.jpg", "title": "Project 27", "year": "2023" },
    { "id": 28, "src": "https://static.wixstatic.com/media/58e6a0_e74696fc25d24def9aea4f31309272dc~mv2.jpg/v1/fill/w_490,h_327,q_85,enc_avif,quality_auto/58e6a0_e74696fc25d24def9aea4f31309272dc~mv2.jpg", "title": "Project 28", "year": "2023" },
    { "id": 29, "src": "https://static.wixstatic.com/media/58e6a0_c5cf2ec9898648af9f1601791f83869d~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_c5cf2ec9898648af9f1601791f83869d~mv2.jpg", "title": "Project 29", "year": "2023" },
    { "id": 30, "src": "https://static.wixstatic.com/media/58e6a0_d06a20354c6742a29c5698d7813c6623~mv2.jpg/v1/fill/w_490,h_365,q_85,enc_avif,quality_auto/58e6a0_d06a20354c6742a29c5698d7813c6623~mv2.jpg", "title": "Project 30", "year": "2023" },
    { "id": 31, "src": "https://static.wixstatic.com/media/58e6a0_ba310175641744d7ac693f4024d3b62f~mv2.jpg/v1/fill/w_490,h_735,q_85,enc_avif,quality_auto/58e6a0_ba310175641744d7ac693f4024d3b62f~mv2.jpg", "title": "Project 31", "year": "2023" },
    { "id": 32, "src": "https://static.wixstatic.com/media/58e6a0_1813450a4b73496f938112ea29299653~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_1813450a4b73496f938112ea29299653~mv2.jpg", "title": "Project 32", "year": "2023" },
    { "id": 33, "src": "https://static.wixstatic.com/media/58e6a0_ec59b0e900a5408fbbda6560f31e4baa~mv2.jpg/v1/fill/w_490,h_366,q_85,enc_avif,quality_auto/58e6a0_ec59b0e900a5408fbbda6560f31e4baa~mv2.jpg", "title": "Project 33", "year": "2023" },
    { "id": 34, "src": "https://static.wixstatic.com/media/58e6a0_70214c6ec1a14f5db53b7476bab254ff~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_70214c6ec1a14f5db53b7476bab254ff~mv2.jpg", "title": "Project 34", "year": "2023" },
    { "id": 35, "src": "https://static.wixstatic.com/media/58e6a0_df7e5f4c12044af1946a45c5b4262234~mv2.jpg/v1/fill/w_490,h_735,q_85,enc_avif,quality_auto/58e6a0_df7e5f4c12044af1946a45c5b4262234~mv2.jpg", "title": "Project 35", "year": "2023" },
    { "id": 36, "src": "https://static.wixstatic.com/media/58e6a0_3f343b7150a04dc4aba6287f07225e80~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_3f343b7150a04dc4aba6287f07225e80~mv2.jpg", "title": "Project 36", "year": "2023" },
    { "id": 37, "src": "https://static.wixstatic.com/media/58e6a0_f655bd3abd0f45468147a05b37bcedb9~mv2.jpg/v1/fill/w_490,h_735,q_85,enc_avif,quality_auto/58e6a0_f655bd3abd0f45468147a05b37bcedb9~mv2.jpg", "title": "Project 37", "year": "2023" },
    { "id": 38, "src": "https://static.wixstatic.com/media/58e6a0_79391034a74e4113adcf964ede30591c~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_79391034a74e4113adcf964ede30591c~mv2.jpg", "title": "Project 38", "year": "2023" },
    { "id": 39, "src": "https://static.wixstatic.com/media/58e6a0_aefb9e9b1748494daf1e250b92c67cb8~mv2.jpg/v1/fill/w_490,h_735,q_85,enc_avif,quality_auto/58e6a0_aefb9e9b1748494daf1e250b92c67cb8~mv2.jpg", "title": "Project 39", "year": "2023" },
    { "id": 40, "src": "https://static.wixstatic.com/media/58e6a0_6e6bc3fda72d40e7a354a9a4407ba08f~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_6e6bc3fda72d40e7a354a9a4407ba08f~mv2.jpg", "title": "Project 40", "year": "2023" },
    { "id": 41, "src": "https://static.wixstatic.com/media/58e6a0_b39c7537059545349c17313dd7048687~mv2.jpg/v1/fill/w_490,h_734,q_85,enc_avif,quality_auto/58e6a0_b39c7537059545349c17313dd7048687~mv2.jpg", "title": "Project 41", "year": "2023" },
    { "id": 42, "src": "https://static.wixstatic.com/media/58e6a0_6001e39f378842a08dd10d67299e900d~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_6001e39f378842a08dd10d67299e900d~mv2.jpg", "title": "Project 42", "year": "2023" },
    { "id": 43, "src": "https://static.wixstatic.com/media/58e6a0_5010d759779e4e76a8181d3ad7e47854~mv2.jpg/v1/fill/w_490,h_735,q_85,enc_avif,quality_auto/58e6a0_5010d759779e4e76a8181d3ad7e47854~mv2.jpg", "title": "Project 43", "year": "2023" },
    { "id": 44, "src": "https://static.wixstatic.com/media/58e6a0_e3285cd0a84e4886bc023fd25d9bd6ed~mv2.jpg/v1/fill/w_489,h_733,q_85,enc_avif,quality_auto/58e6a0_e3285cd0a84e4886bc023fd25d9bd6ed~mv2.jpg", "title": "Project 44", "year": "2023" },
    { "id": 45, "src": "https://static.wixstatic.com/media/58e6a0_0e86754984984df2a0522a984ed40a13~mv2.jpg/v1/fill/w_490,h_734,q_85,enc_avif,quality_auto/58e6a0_0e86754984984df2a0522a984ed40a13~mv2.jpg", "title": "Project 45", "year": "2023" }
  ],
  "personal-projects": [
    { "id": 1, "src": "https://static.wixstatic.com/media/58e6a0_fe17ed44b1ca4a519af20ee39c7fa6d9~mv2.jpg/v1/fill/w_490,h_392,q_85,enc_avif,quality_auto/58e6a0_fe17ed44b1ca4a519af20ee39c7fa6d9~mv2.jpg", "title": "Project 1", "year": "2023" },
    { "id": 2, "src": "https://static.wixstatic.com/media/58e6a0_1f51628bce0e41b19867876ebb7056d6~mv2.jpg/v1/fill/w_489,h_611,q_85,enc_avif,quality_auto/58e6a0_1f51628bce0e41b19867876ebb7056d6~mv2.jpg", "title": "Project 2", "year": "2023" },
    { "id": 3, "src": "https://static.wixstatic.com/media/58e6a0_131f92a38ac44fc28d641c06913cc987~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_131f92a38ac44fc28d641c06913cc987~mv2.jpg", "title": "Project 3", "year": "2023" },
    { "id": 4, "src": "https://static.wixstatic.com/media/58e6a0_f4b3fd7be09a4c9da4fc8d3bdfec36a1~mv2.jpg/v1/fill/w_489,h_391,q_85,enc_avif,quality_auto/58e6a0_f4b3fd7be09a4c9da4fc8d3bdfec36a1~mv2.jpg", "title": "Project 4", "year": "2023" },
    { "id": 5, "src": "https://static.wixstatic.com/media/58e6a0_4df005a362134c829d6bdd12a598b8b4~mv2.jpg/v1/fill/w_489,h_489,q_85,enc_avif,quality_auto/58e6a0_4df005a362134c829d6bdd12a598b8b4~mv2.jpg", "title": "Project 5", "year": "2023" },
    { "id": 6, "src": "https://static.wixstatic.com/media/58e6a0_b25a8fd0d35a426b916963b898a6dd79~mv2.jpg/v1/fill/w_490,h_613,q_85,enc_avif,quality_auto/58e6a0_b25a8fd0d35a426b916963b898a6dd79~mv2.jpg", "title": "Project 6", "year": "2023" }
  ],
  "video": [
    {
      "id": 1,
      "src": "https://static.wixstatic.com/media/58e6a0_dfa43ac1e5bb426e872b954999f50eeb~mv2.jpg/v1/fill/w_980,h_551,q_85,enc_avif,quality_auto/58e6a0_dfa43ac1e5bb426e872b954999f50eeb~mv2.jpg",
      "title": "Project 1",
      "year": "2023",
      "type": "video",
      "iframe": '<iframe title="vimeo-player" src="https://player.vimeo.com/video/836493461?h=90d04e3272" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen></iframe>'
    }
  ]
};

// --- COMPONENTS ---

// Lightbox Component
const LightboxImage = ({ item, category }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const lowResSrc = getWixImageUrl(item.src, 800);
  const highResSrc = getWixImageUrl(item.src, 1920);

  return (
    <motion.div
      layoutId={`card-${item.id}`}
      className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {item.type === 'video' ? (
        <div className="w-full aspect-video bg-black flex items-center justify-center relative z-10" onClick={(e) => e.stopPropagation()}>
           <div dangerouslySetInnerHTML={{ __html: item.iframe }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
        </div>
      ) : (
        <div className="relative w-auto h-auto max-h-[85vh] shadow-2xl">
          <img
            src={lowResSrc}
            alt={item.title}
            className="max-w-full max-h-[85vh] object-contain"
          />
          <motion.img
            src={highResSrc}
            alt={item.title}
            className="absolute inset-0 w-full h-full max-w-full max-h-[85vh] object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      )}

      {/* Caption for lightbox (optional, keeps consistency) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-white text-center"
      >
        <h3 className="text-2xl font-light uppercase tracking-widest mb-2">{item.title}</h3>
        <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">{category.replace('-', ' ')} · {item.year}</p>
      </motion.div>
    </motion.div>
  );
};

const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { name: "Fashion & Beauty", id: "fashion-beauty" },
    { name: "Advertising", id: "advertising" },
    { name: "Personal Projects", id: "personal-projects" },
    { name: "Video", id: "video" },
    { name: "About", id: "about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white px-6 py-6 flex justify-between items-center">
      <div 
        className="text-xl font-bold tracking-widest cursor-pointer uppercase z-50"
        onClick={() => setActiveSection('home')}
      >
        Andrey Yaroshevich
      </div>

      <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveSection(link.id)}
            className={`hover:opacity-100 transition-opacity uppercase text-xs ${
              activeSection === link.id ? "opacity-100 underline underline-offset-8 decoration-1" : "opacity-60"
            }`}
          >
            {link.name}
          </button>
        ))}
      </nav>

      <button 
        className="md:hidden z-50 p-2 bg-black/80 backdrop-blur-md rounded-full mt-2 mr-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-black text-white flex flex-col justify-center items-center z-40 gap-8"
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveSection(link.id);
                  setIsMenuOpen(false);
                }}
                className="text-2xl uppercase tracking-widest font-light hover:text-gray-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ setActiveSection }) => {
  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 opacity-40 bg-[url('https://static.wixstatic.com/media/58e6a0_831ae797a52a4118bac0ba8076db1215~mv2.jpg/v1/fill/w_1920,h_1080,q_85,enc_avif,quality_auto/58e6a0_831ae797a52a4118bac0ba8076db1215~mv2.jpg')] bg-cover bg-center"
      />
      <div className="relative z-10 text-center flex flex-col items-center gap-6 px-4">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-light uppercase tracking-tighter"
        >
          Visual <br className="md:hidden" /> Narrative
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm md:text-base font-light tracking-[0.2em] uppercase text-gray-300 max-w-md"
        >
          Fashion · Beauty · Advertising · Los Angeles
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setActiveSection('fashion-beauty')}
          className="mt-8 px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 uppercase text-xs tracking-widest flex items-center gap-2 group"
        >
          Explore Portfolio
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
};

// --- SECTION SPECIFIC GALLERIES ---

// 1. Masonry Gallery (Fashion & Beauty) - Irregular, Dynamic
const MasonryGallery = ({ category, title, items, setSelectedId }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
    {items.map((item, index) => (
      <motion.div
        layoutId={`card-${item.id}`}
        key={item.id}
        onClick={() => setSelectedId(item.id)}
        className={`relative group cursor-pointer overflow-hidden bg-gray-200 ${index % 3 === 0 ? 'md:row-span-2' : ''}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.4 }}
      >
        <motion.img
          src={getWixImageUrl(item.src, 800)}
          alt={item.title}
          className="w-full h-full object-cover aspect-[3/4] md:grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <span className="text-white text-xs tracking-widest uppercase mb-1">{item.year}</span>
          <h3 className="text-white text-xl font-light uppercase tracking-wider flex items-center gap-2">
            {item.title}
          </h3>
        </div>
      </motion.div>
    ))}
  </div>
);

// 2. Advertising Grid (Clean, no cropping)
const AdvertisingGallery = ({ category, title, items, setSelectedId }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
    {items.map((item, index) => (
      <motion.div
        layoutId={`card-${item.id}`}
        key={item.id}
        onClick={() => setSelectedId(item.id)}
        className="relative group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Container allows natural height (h-auto), avoiding cropping */}
        <div className="w-full h-auto bg-gray-100 overflow-hidden">
          <motion.img
            src={getWixImageUrl(item.src, 1200)}
            alt={item.title}
            className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        
        {/* Caption below image for editorial look */}
        <div className="mt-4 border-t border-black/10 pt-3 flex justify-between items-baseline">
          <h3 className="text-lg font-medium uppercase tracking-wider text-black">{item.title}</h3>
          <span className="text-xs text-gray-400 tracking-widest">{item.year}</span>
        </div>
      </motion.div>
    ))}
  </div>
);

// 3. Single Project Layout (Personal Projects) - Vertical Flow
const SingleProjectLayout = ({ category, title, items, setSelectedId }) => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-24 py-12">
      {items.map((item, index) => (
        <motion.div
          layoutId={`card-${item.id}`}
          key={item.id}
          // Remove onClick here to disable opening lightbox since these are large enough
          className="relative group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full bg-gray-100 shadow-xl overflow-hidden">
            <motion.img
              src={getWixImageUrl(item.src, 1200)}
              alt={item.title}
              className="w-full h-auto object-cover block"
            />
          </div>
          {/* Subtle caption, distinct from other sections */}
          <div className="mt-4 text-center">
             <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">Image {String(index + 1).padStart(2, '0')}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// 4. Video Gallery - Cinematic
const VideoGallery = ({ category, title, items, setSelectedId }) => (
  <div className="space-y-12">
    {items.map((item, index) => (
      <motion.div
        layoutId={`card-${item.id}`}
        key={item.id}
        onClick={() => setSelectedId(item.id)}
        className="relative group cursor-pointer bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="aspect-video relative overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
          <motion.img
            src={getWixImageUrl(item.src, 1200)}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 fill-white text-white ml-1" />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-2xl font-light uppercase tracking-widest text-white">{item.title}</h3>
        </div>
      </motion.div>
    ))}
  </div>
);

// Main Gallery Container
const GallerySection = ({ category, title }) => {
  const [selectedId, setSelectedId] = useState(null);
  const items = portfolioData[category] || [];

  // Choose layout based on category
  const renderLayout = () => {
    switch (category) {
      case 'fashion-beauty':
        return <MasonryGallery items={items} setSelectedId={setSelectedId} category={category} title={title} />;
      case 'advertising':
        // NEW: Adaptive grid that doesn't crop
        return <AdvertisingGallery items={items} setSelectedId={setSelectedId} category={category} title={title} />;
      case 'personal-projects':
        // NEW: Vertical story flow for single project
        return <SingleProjectLayout items={items} setSelectedId={setSelectedId} category={category} title={title} />;
      case 'video':
        return <VideoGallery items={items} setSelectedId={setSelectedId} category={category} title={title} />;
      default:
        return <MasonryGallery items={items} setSelectedId={setSelectedId} category={category} title={title} />;
    }
  };

  const isDarkTheme = category === 'video';

  return (
    <div className={`min-h-screen pt-32 pb-20 px-4 md:px-12 ${isDarkTheme ? 'bg-zinc-950 text-white' : 'bg-white text-black'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`mb-16 flex flex-col md:flex-row justify-between items-end border-b pb-6 ${isDarkTheme ? 'border-white/10' : 'border-black/10'}`}
      >
        <h2 className="text-4xl md:text-6xl font-thin uppercase tracking-tight">{title}</h2>
        <span className={`text-xs uppercase tracking-widest mt-4 md:mt-0 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          Selected Works {items.length > 0 ? `(01-${items.length.toString().padStart(2, '0')})` : ''}
        </span>
      </motion.div>

      {renderLayout()}

      {/* Lightbox / Expanded View */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedId(null)}
          >
            {items.map((item) => {
              if (item.id === selectedId) {
                return (
                  <React.Fragment key={item.id}>
                    <LightboxImage item={item} category={category} />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(null);
                      }}
                      className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-all bg-black/20 hover:bg-black/50 rounded-full p-2 z-[70]"
                    >
                      <X size={32} />
                    </button>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 5. About Section - Full Background
const About = () => {
  const bgImage = "https://static.wixstatic.com/media/58e6a0_dbea34fe641e4288a42192b38411ea00~mv2.jpg/v1/fill/w_1460,h_1625,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/58e6a0_dbea34fe641e4288a42192b38411ea00~mv2.jpg";

  return (
    <div className="h-screen w-full relative flex items-center justify-center text-white overflow-hidden">
      {/* Full Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src={bgImage}
          alt="Andrey Yaroshevich" 
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 px-4 md:px-12 relative z-10 pt-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-300 mb-8">About The Artist</h2>
          <h3 className="text-3xl md:text-5xl font-light leading-tight mb-8">
            Andrey is a dedicated photographer with over <span className="font-normal italic text-white/90">14 years</span> of experience in the fashion and beauty industry.
          </h3>
          <div className="space-y-6 text-gray-300 font-light leading-relaxed max-w-xl text-lg mix-blend-plus-lighter">
            <p>
              His work has appeared in renowned magazines such as <span className="text-white font-medium">Harper&apos;s Bazaar</span>, <span className="text-white font-medium">Numéro</span>, <span className="text-white font-medium">L’Officiel</span>, <span className="text-white font-medium">Grazia</span>, and <span className="text-white font-medium">Marie Claire</span>, as well as in numerous independent magazines.
            </p>
            <p>
              With a keen eye for aesthetics and lighting, Andrey crafts visual narratives that transcend distinct boundaries between commercial appeal and artistic expression.
            </p>
            <div className="pt-8 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white/50"></div>
              <span className="uppercase text-xs tracking-widest font-medium text-white/80">Based in Los Angeles, available worldwide</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-24 px-4 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h4 className="text-3xl md:text-4xl font-light uppercase tracking-wide mb-8">Let&apos;s create something<br/>memorable together.</h4>
          <a 
            href="mailto:andreyyyaroshevich@gmail.com" 
            className="text-xl md:text-2xl border-b border-white/30 hover:border-white hover:text-gray-200 transition-all pb-1 inline-flex items-center gap-3"
          >
            andreyyyaroshevich@gmail.com
            <ExternalLink size={20} />
          </a>
        </div>

        <div className="flex flex-col gap-4 items-start md:items-end">
          <div className="flex gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="mailto:andreyyyaroshevich@gmail.com" className="hover:text-gray-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-4">
            © {new Date().getFullYear()} Andrey Yaroshevich. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Hero setActiveSection={setActiveSection} />;
      case 'fashion-beauty':
        return <GallerySection category="fashion-beauty" title="Fashion & Beauty" />;
      case 'advertising':
        return <GallerySection category="advertising" title="Advertising" />;
      case 'personal-projects':
        return <GallerySection category="personal-projects" title="Personal Projects" />;
      case 'video':
        return <GallerySection category="video" title="Video" />;
      case 'about':
        return <About />;
      default:
        return <Hero setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="font-sans selection:bg-black selection:text-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {activeSection !== 'home' && <Footer />}
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
}