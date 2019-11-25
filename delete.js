class infunc {
    constructor() {
        this.in = 'in'
    }
}

newIn = new infunc()


class hello {

    constructor(yes) {
        this._yes = newIn.in

    }

    getyes() {
        console.log(this._yes)
    }
}

h = new hello('itworks')

h.getyes()
