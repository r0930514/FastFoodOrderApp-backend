import fs from "fs"
class TestFileService{
    static path = "./private/acpwd.json"
    static async objectWriteFile(object){
        await fs.writeFileSync(this.path, JSON.stringify(object))
    }
    static async fileReadObject(){
        const raw = await fs.readFileSync(this.path)
        const json = JSON.parse(raw)
        return json 
    }
}

export default TestFileService

