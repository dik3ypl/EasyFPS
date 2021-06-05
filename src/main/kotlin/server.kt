import com.google.gson.Gson
import spark.Filter
import spark.Request
import spark.Response
import java.io.*
import java.net.ServerSocket
import java.util.*
import spark.Spark.*

fun main() {
    port(5000)
    staticFiles.location("/public")

    get("/") { req, res -> index(req, res) }
    get("/editor") { req, res -> editor(req, res) }
    get("/game") { req, res -> game(req, res) }

    post("/save") { req, res -> save(req, res) }
    get("/load") { req, res -> load(req,res)}
    get("/test") { req, res -> test(req,res)}
}