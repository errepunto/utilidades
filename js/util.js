
/**
 * Este archivo contiene una serie de utilidades escritas en ECMA Script, sin
 * utilizar elemntos propios del navegador, como el árbol DOM o las variables
 * del navegador.
 *
 * Todas las funciones y variables se añaden al objeto Util, que funciona como
 * un espacio de nombres (en algunos lenguajes de programación también se llaman
 * "paquetes" o "módulos").
 */

////////////////////////
// VARIABLES GLOBALES //
////////////////////////
toolsTarget = "main";


///////////////////////
// FUNCIONES COMUNES //
///////////////////////
/**
 * Esconde o muestra el componente indicado.
 *
 * - elementName: ID del elemento a esconder (generalmente es un div).
 * - span: Elemento span que cambia el nombre al pulsarlo.
 */
function showHide(elementName)
{
    var elemento = getElement(elementName);

    if(!elemento){
        return;
    }

    //Alterna entre block y none para mostrar o no el <div/>
    if(elemento.style.display != "none"){
        elemento.style.display = "none";
    }else{
        elemento.style.display = "block";
    }
}


/**
 * Copiado de aNieto2k: permite extraer el valor de un parámetro de la URL
 *
 * - name: Nombre del parámetro
 */
function gup(name)
{
    var regexS = "[\?&]"+name+"=([^&#]*)";
    var regex = new RegExp ( regexS );
    var tmpURL = window.location.href;
    var results = regex.exec( tmpURL );

    if( results == null )
        return "";
    else
        return results[1];
}


/**
 * Utiliza una expresión regular para convertir sustituir un patrón en el
 * texto de un elemento con el texto de otro elemento.
 * - regexpElementID: ID del elemento con la expresión regular.
 * - textElementID: ID del elemento con el texto.
 * - replaceElementID: ID del elemento con el texto a sustituir.
 * - resultElementID: ID del elemento.
 */
function replaceRegexp(regexpElementID, textElementID, replaceElementID, resultElementID)
{
    //Extrae los elementos a partir de su ID
    var eRegexp = document.getElementById(regexpElementID);
    var eTexto = document.getElementById(textElementID);
    var eSustitucion = document.getElementById(replaceElementID);
    var eResultado = document.getElementById(resultElementID);
    
    //Construye la expresión regular
    var re = new RegExp(eRegexp.value, "gm");

    eResultado.value = eTexto.value.replace(re, eSustitucion.value);
}


/**
 * Añade un nodo de texto a otro nodo.
 * 
 * - parentElementID: ID del elemento que contendrá al nodo.
 * - text: Texto del nodo
 */
function appendResult(parentElementID, text)
{
    var nodoPadre = document.getElementById(parentElementID);
    var nodotext = document.createTextNode(text);

    nodoPadre.appendChild(nodotext);
    nodoPadre.normalize();
}


function getElement(id)
{
    return document.getElementById(id);
}

/**
 * Obtiene el valor de un input o un textarea con el ID indicado.
 *
 * -id: ID del elemento
 */
function getValue(id)
{
    return getElement(id).value;
}


/**
 * Establece el valor del input o textarea con el ID indicado.
 *
 * -id: ID del elemento
 * -value: Nuevo valor del elemento
 */
function setValue(id, value)
{
    getElement(id).value = value;
}


//Añade una función al evento "onload"
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}



////////////////
// UTILIDADES //
////////////////

/**
 * "Constructor" del módulo.
 */
function Util()
{
	alert("Por favor, no cree instancias de esta clase");
}


/**
 * Devuelve un número aleatorio entero entre los dos indicados (ambos incluidos)
 * - lower: Mínimo número que deseamos que salga.
 * - upper: Máximo número que deseamos que salga.
 */
Util.randomBetween = function(lower, upper)
{
	var dif = upper - lower + 1;
	return Math.floor(Math.random()*dif + lower);
};


/**
 *Ejecuta la función pasada como parámetro y devuelve el número de milisegundos que ha tardado en ejecutarse
 */
Util.time = function(func)
{
	var ini = (new Date()).getTime();
	func();
	var fin = (new Date()).getTime();
	return fin - ini;
}



////////////
// CLASES //
////////////

//
// Clase Util.StringBuffer
//

/**
 * Clase StringBuffer para emular el StringBuffer de Java y agilizar la concatenación
 * de cadenas de texto.
 */
Util.StringBuffer = function(str)
{
	//Array que contendrá las subcadenas
	this.buffer = new Array();

	//Si se pasa el argumento str, se utiliza como primera posición del buffer
	if(str != undefined){
		this.buffer[0] = str;
	}
}

/**
 * Método para añadir una nueva cadena al buffer.
 */
Util.StringBuffer.prototype.append = function(str){
	this.buffer.push(str);
};

/**
 * Devuelve la cadena de texto formada por la concatenación de todas las subcadenas.
 */
Util.StringBuffer.prototype.toString = function(){
	return this.buffer.join("");
};


//
// Clase Hashmap
//

/**
 * Objeto Hashmap para facilitar el tratamiento de hashmaps
 */
function Hashmap(object)
{   
    if(object == undefined) {
        this.o = new Object();
    } else {
        this.o = object;
    }
}


/**
 * Comprueba si existe la clave
 */
Hashmap.prototype.hasKey = function(key)
{
    for(var i in this.o){
        if(i == key){
            return true;
        }
    }
    
    return false;
}


/**
 * Comprueba si existe el valor
 */
Hashmap.prototype.hasValue = function(value)
{
    for(var i in this.o){
        if(this.o[i] == value){
            return true;
        }
    }
    return false;
}


/**
 * Comprueba si existe el valor
 */
Hashmap.prototype.put = function(key, value)
{
    this.o[key] = value;
}

/**
 * Obtiene un valor con la clave indicada
 */
Hashmap.prototype.get = function(key)
{
    return this.o[key];
}


/**
 * Obtiene las claves del hashmap en un array. No tienen por qué
 * estar ordenadas
 */
Hashmap.prototype.getKeys = function()
{
    var a = new Array();
    var i = 0;
    for(var j in this.o) {
        a[i] = j;
        i++;
    }
    
    return a;
}


/**
 * Obtiene un array con los valores del hashmap. El orden de los valores puede ser
 * impredecible.
 */
Hashmap.prototype.getValues = function()
{
    var a = new Array();
    var i = 0;
    for(var j in this.o) {
        a[i] = this.get(j);
        i++;
    }
    
    return a;
}