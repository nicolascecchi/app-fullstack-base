class Main implements EventListenerObject, HandlerPost{
    public myFramework: MyFramework;
    public main(): void {
        this.myFramework = new MyFramework();
        let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        //console.log("Llego la respuesta!!!!");
                        //console.log(xhr.responseText);

                        // Llega la respuesta con todos los elementos
                        let listaDis: Array<Device> = JSON.parse(xhr.responseText);
                        
                        for (let disp of listaDis ){
                        
                            let listaDisp = this.myFramework.getElementById("listaDisp");
                            listaDisp.innerHTML += `<li class="collection-item avatar">
                            <img src="./static/images/lightbulb.png" alt="" class="circle">
                            <span class="nombreDisp">${disp.name} 
                                <a id = "disp-${disp.id}-boton-edit" class="btn-floating btn-small waves-effect waves-light boton-edit" >
                                    <i class="material-icons">edit</i></a>
                            </span>
                            <p>
                                ${disp.description}
                            </p>
                                                     
                            <a href="#!" class="secondary-content">
                                <div class="switch">
                                    <label>
                                      Off
                                      <input id="disp-${disp.id}-state" type="checkbox">
                                      <span class="lever"></span>
                                      On
                                    </label>
                                  </div>
                            </a>
                          </li>`;
                                                     
                        }
                        for (let disp of listaDis) {
                            let editDisp = this.myFramework.getElementById("disp-" + disp.id +"-boton-edit");
                            editDisp.addEventListener("click",this.myFramework.clickOnEdit);
                            console.log(editDisp);
                        }

                        for (let disp of listaDis) {
                            let checkDisp = this.myFramework.getElementById("disp-" + disp.id +"-state");
                            checkDisp.addEventListener("click", this);
                            console.log(checkDisp);
                        }
                    } 
                     else {
                        alert("error!!");
                        }
                }
            }
            xhr.open("GET","http://localhost:8000/devices",true);
            xhr.send();      
    }

    public mostrarLista() {
        let listaUsr: Array<User> = new Array<User>();

        let usr1 = new User(1, "matias", "mramos@asda.com", true);
        let usr2 = new User(2, "Jose", "jose@asda.com", false);
        let usr3 = new User(3, "Pedro", "perdro@asda.com", false);
        
        usr1.setIsLogged(false);
        listaUsr.push(usr1);
        listaUsr.push(usr2);
        listaUsr.push(usr3);
        
        for (let obj in listaUsr) {
            listaUsr[obj].printInfo();
        }
    }

    public handleEvent(ev: Event) {
        let objetoClick: HTMLElement = <HTMLElement>ev.target;
        // Acción del botón "Listar"
        if (objetoClick.id.match(/disp-\d+-state/)){         
            let checkBox: HTMLInputElement = <HTMLInputElement>ev.target;
            console.log(checkBox.id + " - " + checkBox.checked);
            let datos = {"id":checkBox.id,"status":checkBox.checked};
            this.myFramework.requestPOST("http://localhost:8000/devices",this,datos);
            
        }else if (objetoClick.id.match(/disp-\d+-boton-edit/)){
            //let element_to_edit: HTMLElement= this.myFramework.getElementById();
            //this.myFramework.editDeviceForm(objetoClick.id);
            console.log("boton de edit");
        }       
        else{
            console.log("Algo salió mal")
        }
    }
    
    responsePost(status: number, response: string) {
        alert(response);
    }
}

window.addEventListener("load", ()=> {
    let miObjMain: Main = new Main();
    miObjMain.main();

    //Cambia el texto del botón. No aporta funcionalidades.
    let addNewDisp:HTMLElement = miObjMain.myFramework.getElementById("agregar-disp");
    addNewDisp.addEventListener("click", miObjMain.myFramework.newDevice);
    
    let switchAllDisp: HTMLElement = miObjMain.myFramework.getElementById("btn-all-devices");
    switchAllDisp.addEventListener("dblclick", ()=>{console.log("funcion no implementada")});

});


