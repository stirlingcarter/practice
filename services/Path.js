export default class Path {

    static up(path){
        return path.substring(0,path.lastIndexOf('/'))
    }

    static currentDir(path){
        return path.substring(path.lastIndexOf('/')+1)
    }

    static plus(path, p){
        return path + '/' + p
    }


}