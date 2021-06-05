import com.google.gson.Gson
import spark.Request
import spark.Response

data class Small(
    var id: Int,
    var type: String,
)

data class Big(
    var size: Int,
    var list: Array<Small>,
)

var level = Gson().fromJson("""{"size": 0, "list": []}""", Big::class.java)

fun index(req: Request, res: Response): Response {
    res.type("text/html")
    res.redirect("index.html")
    return res
}

fun editor(req: Request, res: Response): Response {
    res.type("text/html")
    res.redirect("editor.html")
    return res
}

fun game(req: Request, res: Response): Response {
    res.type("text/html")
    res.redirect("Project/dist/index.html")
    return res
}

fun save(req: Request, res: Response): String {
    level = Gson().fromJson(req.body(), Big::class.java)
    return Gson().toJson("""{"text": "Zapisano level !"}""")
}

fun load(req: Request, res: Response): String {
    println(Gson().toJson(level))
    return Gson().toJson(level)
}

fun test(req: Request, res: Response): String {
    level = TEST
    return Gson().toJson("""{"text": "Zapisano level testowy !"}""")
}