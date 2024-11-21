# MagicMirror

一键 AI 换脸、发型、穿搭，发现更美的自己 ✨

[![GitHub release](https://img.shields.io/github/v/release/idootop/MagicMirror.svg)](https://github.com/idootop/MagicMirror/releases) [![Release MagicMirror](https://github.com/idootop/MagicMirror/actions/workflows/build-app.yaml/badge.svg)](https://github.com/idootop/MagicMirror/actions/workflows/build-app.yaml)

![](src/assets/images/magic-mirror.svg)

## 功能亮点

- 一键换脸：打开安装包，拖张照片进去就能换脸，无需配置各种复杂参数。
- 超低门槛：不用 GPU 也能运行，小白的普通电脑也可以轻松玩转 AI 换脸。
- 隐私安全：完全在你的电脑本地运行，不需要联网，不用担心你的图片会被上传到任何地方。
- 极致精简：安装包不到 10 MB，模型文件加起来不到 1 GB，这可能是最轻量的离线换脸应用之一。

## 快速开始

MagicMirror 目前仅支持 macOS 和 Windows 系统：

1. [下载安装包](https://github.com/idootop/MagicMirror/releases/tag/app-v1.0.0)
2. [初始化教程](#)

更详细的使用说明和常见问题，请看[使用教程](#)。

## 动机

我想你跟我一样，有时会纠结自己适合哪种发型，或者哪种穿搭最好看？要是有一个应用可以把看到的喜欢的发型，或者心动的穿搭，直接放到自己身上预览效果，那真是太好了。

现在的 AI 技术已经很成熟了，但是市面上大部分的 AI 应用，要么需要配置复杂的参数和运行环境，要有性能足够强劲的 GPU 才能运行，使用门槛和成本偏高，要么需要上传自己的图片到服务器进行转换，存在隐私泄漏的风险。

理想的解决方案应该像自拍一样简单：不需要设置复杂的参数，不用购买昂贵的设备，也无需担心隐私泄漏的问题。

所以，为什么不自己做一个呢？

于是便有了 MagicMirror ✨

Enjoy! ;)

## 鸣谢

MagicMirror 的实现主要使用和参考了以下开源项目，特此鸣谢:

- [Tauri](https://github.com/tauri-apps/tauri): Build smaller, faster, and more secure desktop and mobile applications with a web frontend.
- [FaceFusion](https://github.com/facefusion/facefusion): Industry leading face manipulation platform
- [InsightFace](https://github.com/deepinsight/insightface): State-of-the-art 2D and 3D Face Analysis Project
- [Nuitka](https://github.com/Nuitka/Nuitka): Nuitka is a Python compiler written in Python.

## Disclaimer

MagicMirror is designed for personal entertainment and creative purposes only. Please note:

- **Ethical Usage**: This software should not be used to create content that:
  - Impersonates others with malicious intent
  - Creates or spreads misinformation
  - Violates personal privacy or dignity
  - Produces explicit or inappropriate content
- **Content Rights**: Users are responsible for:

  - Obtaining necessary permissions for using source images
  - Respecting copyright and intellectual property rights
  - Following local laws and regulations regarding AI-generated content

- **Liability**: The creators of MagicMirror:
  - Do not endorse or take responsibility for user-generated content
  - Cannot guarantee the software's results or accuracy
  - Are not liable for any misuse or consequences thereof

By using MagicMirror, you agree to these terms and commit to using the software responsibly.

## License

This project is licensed under the [MIT License](./LICENSE).
