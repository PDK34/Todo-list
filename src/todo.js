
export default class Todo{
    constructor(title,description = '',dueDate,check = false,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.check = check;
        this.priority = priority;
    }

    checkToggle(){
        this.check = !this.check;
    }

}
