var Security = {
    property: undefined,
    property2: undefined,
    /**
    * do something with the new parametre 
    @type {function}
    @param {string} coucou
    */
    test : function(coucou) {
        console.log(coucou)
    },
    test2: () => {
        console.log('coucou2')
    },
    test3:function(){
        console.log("je suis une fonction")
    }
}

module.exports = Security