export default class Util {

    static getNamesOfVariantsFromVHashes(vHashes) {
        //make n+1 sets, n = number of $
        let n = vHashes[0].split("$").length
        let variantSets = []
        for (let i = 0; i < n; i++) {
            let tmp = new Set()
            variantSets.push(tmp)
        }

        for (let k = 0; k < vHashes.length; k++) {

            //cats is ["A","maj 7", "left"]
            let variants = vHashes[k].split("$")
            for (let i = 0; i < n; i++) {
                variantSets[i].add(variants[i])
            }
        }

        let namesOfVariants = []
        for (let i = 0; i < n; i++) {
            namesOfVariants.push(Array.from(variantSets[i]))

        }
        return namesOfVariants
    }

    static vHashToName(vHash) {
        let args = vHash.split("$")
        let name = ""
        for (let i = 0; i < args.length; i++) {
            name += args[i]
            if (i != args.length - 1) {
                name += " "
            }
        }
        return name
    }


    //given a list of vHashes
    //given a matching str A, maj7, etc
    //return all vHashes that match 
    //given that the s should match an entire substr, this is possible 
    //but this creates a new restriction, cant have the same variant member twice 
    static getAllVHashesContainingVariant(vHashes, variant) {

        let res = []

        for (let i = 0; i < vHashes.length; i++) {
            let variants = vHashes[i].split("$")
            for (let k = 0; k < variants.length; k++) {
                if (variant === variants[k]) {
                    res.push(vHashes[i])
                }
            }

        }

        return res

    }

}