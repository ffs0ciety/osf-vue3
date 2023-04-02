
import _ from "lodash";
import GoalsApi from "@/services/apis/osfGoals"
import { userStore } from "@/stores/user";
import { goalsStore } from "@/stores/goals";


export async function createGoal(title:string, description: string, daily: boolean){
    var goals = new GoalsApi();
    return await goals.createGoal({
        title: title,
        description: description,
        daily: daily
    }).then( async newGoal => {
        var storeGoals = goalsStore();
        storeGoals.goals = await goals.getGoals();
    })
}

export async function getGoals(){
    var storeGoals = goalsStore();
    var goals = new GoalsApi();
    storeGoals.goals = await goals.getGoals();
}

export async function addEntrance(goalId: string){
    var goals = new GoalsApi();
    await goals.addEntrance(goalId).then(  async newGoal => {
        var storeGoals = goalsStore();
        storeGoals.goals = await goals.getGoals();
    })
}



