import argparse
import time

from magic import load_models, swap_face


def main():
    # 创建解析器
    parser = argparse.ArgumentParser(description="Swap faces in images.")

    # 添加命令行参数
    parser.add_argument("input_image", type=str, help="Path to the input image")
    parser.add_argument("target_image", type=str, help="Path to the target image")

    # 解析命令行参数
    args = parser.parse_args()

    # 调用 swap_face 函数
    print("🔥 加载模型...")
    start_time = time.time()
    load_models()
    print("✅ 模型加载完毕")
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"执行耗时: {execution_time:.6f} 秒")

    print("🔥 换脸中...")
    start_time = time.time()
    swap_face(args.input_image, args.target_image)
    print("✅ Done!")
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"执行耗时: {execution_time:.6f} 秒")


if __name__ == "__main__":
    main()
