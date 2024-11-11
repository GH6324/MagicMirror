import os
from functools import lru_cache

import cv2
from tinyface import TinyFace

_tf = TinyFace()


def load_models():
    try:
        _tf.config.face_detector_model = _get_model_path("scrfd_2.5g.onnx")
        _tf.config.face_embedder_model = _get_model_path("arcface_w600k_r50.onnx")
        _tf.config.face_swapper_model = _get_model_path("inswapper_128_fp16.onnx")
        _tf.config.face_enhancer_model = _get_model_path("gfpgan_1.4.onnx")
        _tf.prepare()
        return True
    except BaseException as _:
        return False


@lru_cache(maxsize=12)
def swap_face(input_path, face_path):
    try:
        save_path = _get_output_file_path(input_path)
        output_img = _swap_face(input_path, face_path)
        cv2.imwrite(save_path, output_img)
        return save_path
    except BaseException as _:
        return None


@lru_cache(maxsize=12)
def _swap_face(input_path, face_path):
    return _tf.swap_face(
        vision_frame=_read_image(input_path),
        reference_face=_get_one_face(input_path),
        destination_face=_get_one_face(face_path),
    )


@lru_cache(maxsize=12)
def _get_one_face(face_path: str):
    face_img = _read_image(face_path)
    return _tf.get_one_face(face_img)


@lru_cache(maxsize=12)
def _read_image(img_path: str):
    return cv2.imread(img_path)


def _get_output_file_path(file_name):
    base_name, ext = os.path.splitext(file_name)
    return base_name + "_output" + ext


def _get_model_path(file_name: str):
    return os.path.abspath(
        os.path.join(os.path.dirname(__file__), os.pardir, "models", file_name)
    )
