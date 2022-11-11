export default class InputParser {

    static parseGoalFromStringInput(goal){

        if (goal == null || isNaN(goal) || goal <= 0){
          goal = 1
        }
    
        return goal
    
      }

    static parseVariantsFromStringInput(variants){

        v = []

        if (variants != null){
        v = variants.split(",")
        var i;
        for (i = 0; i < v.length; i++) { 
            v[i] = v[i].trim()
        }
        }

        return v

    }
}