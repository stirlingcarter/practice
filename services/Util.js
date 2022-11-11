export default class Util {

    static vHashToName(vHash){
        let args = vHash.split("$")
        let name = ""
        for (let i = 0; i < args.length; i++){
            name += args[i]
            if (i != args.length-1){
                name += " "
            }
        }
    }

}