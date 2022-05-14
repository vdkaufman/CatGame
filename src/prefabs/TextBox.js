class TextBox extends RexPlugins.UI.TextBox {
    constructor(scene, config) {
        super(scene, config);
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        // the textbox definition
        this.content = 'asklfjhafkjhas  khj sdfkhjakhjsdf aksdjf hasdk fjhajklshd fadksj fhask dfhadksj hfkal sdhfk asdhfkl ahsdjkfhas dklfha sjkfh alksdfh ajksdh fsdklfh alsdkhasdfjkh';
    
    }

    create(){

    }

// handleVisibility(show){
    //     if (show){

    //     }
    // }
}