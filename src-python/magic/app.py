import json

from async_tasks import AsyncTask
from bottle import Bottle, request, response

from .face import load_models, swap_face

app = Bottle()

# https://github.com/bottlepy/bottle/issues/881#issuecomment-244024649
app.plugins[0].json_dumps = lambda *args, **kwargs: json.dumps(
    *args, ensure_ascii=False, **kwargs
).encode("utf8")


@app.get("/status")
def get_status():
    return {"status": "started"}


@app.get("/prepare")
def prepare():
    return {"success": load_models()}


@app.post("/task")
def create_task():
    try:
        task_id = request.json["id"]
        input_image = request.json["inputImage"]
        target_face = request.json["targetFace"]
        assert all([task_id, input_image, target_face])
        res, _ = AsyncTask.run(
            lambda: swap_face(input_image, target_face), task_id=task_id
        )
        return {"result": res}
    except BaseException:
        response.status = 400
        return {"error": "Something went wrong!"}


@app.delete("/task/<task_id>")
def cancel_task(task_id):
    AsyncTask.cancel(task_id)
    return {"success": True}
