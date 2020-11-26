/**
 * Clase Pila (Stack). Se ha decidido implementar esta pila con 
 * los nombres de las variables en Inglés, para un uso más generalizado
 * abierto a reutilización.
 * 
 * La pila es una estructura de datos lineal en la cual se sigue un orden
 * para añadir y eliminar elementos denominado LIFO (last in first out).
 * El último elemento que se introduce es el primero que se extrae.
 */
class Stack {
    constructor(){
        this.stack = new Array(); //Se ha escogido implementar la pila a través de un objeto Array
    }

    /**
     * Introduce un valor a la pila
     * Respetando el guión de la práctica, 
     * solo se aceptan integers y float en la pila
     * @param {Number} value 
     */
    push(value){
        if (isNaN(value)) //Previene un mal uso de la pila (que en nuestra aplicación solo acepta números). 
            alert("El valor introducido debe ser un número"); //No se alcanza nunca ya que la propia implementación llamará a push teniendo solo números como input
        else
            this.stack.push(value);
    }

    /**
     * Extrae un valor de la pila y lo devuelve
     * 
     * @return {Number} El último valor contenido en la pila o
     * {String} "Empty Stack" si la pila está vacía
     */
    pop(){
        if(!this.isEmpty())
            return (this.stack.pop());
        else
            return "Empty Stack";
    }

    /**
     * Comprueba si la pila está vacía
     */
    isEmpty(){
        return this.stack.length == 0;
    }

    getLength(){
        return this.stack.length;
    }

    /**
     * Devuelve un String con el contenido de la pila
     * Muestra el orden de extracción, es decir, el elemento
     * de la posición superior, el primero que aparece, es el 
     * próximo es salir (el último que se ha metido)
     * 
     * @return {String} Contenido de la pila en orden de extracción
     */
    showStack(){ 
        var elements = "";
        for (var i = this.stack.length - 1; i >= 0; i--)
            elements += (i+1) + ":" + "\t" + this.stack[i] + "\n" ;
        return elements;
    }

    /**
     * Función que devuelve el valor en cabeza de la pila (sin extraerlo de ella)
     * @return {Number} Valor en cabeza (siguiente a extraer)
     */
    getHead(){
        return this.stack[this.stack.length-1];
    }
}


class Calculadora {
    constructor() {
        this.pantalla = "";
        this.memoria = 0;
    } 


    actualizarPantalla(){
        document.getElementById("pantalla").value = this.pantalla;
    }

    digito(digito) {
        this.pantalla = this.pantalla.concat(digito);
        this.actualizarPantalla();
    }

    punto() {
        this.pantalla = this.pantalla.concat(".");;
        this.actualizarPantalla();
    }

    suma() {
        this.pantalla = this.pantalla.concat("+");
        this.actualizarPantalla();
    }

    resta() {
        this.pantalla = this.pantalla.concat("-");
        this.actualizarPantalla();
    }

    multiplicacion() {
        this.pantalla = this.pantalla.concat("*");
        this.actualizarPantalla();
    }

    division() {
        this.pantalla = this.pantalla.concat("/");
        this.actualizarPantalla();      
    }

    /**
     * Guarda en memoria el valor de la pantalla
     */
    ms() {
        var input = document.getElementById("pantalla").value;
        if (isNaN(input))
            alert("Only numbers can be stored in memory") //Probando el objeto predefinido alert() cuyo uso está desaconsejado debido a que muchos usuarios pueden tenerlo deshabilitado en sus navegadores
        else
            this.memoria = Number(input);
            this.pantalla = this.memoria.toString();
        this.actualizarPantalla();
    }

    /**
     * Borra lo que está en memoria
     */
    mc() {
        this.memoria = 0;
        document.getElementById("pantalla").value = "Memoria: 0";
        this.pantalla = ""; //Resetea también los valores previos almacenados en pantalla
    }

    /**
     * Recupera lo que está en memoria
     */
    mr() {
        this.pantalla = this.memoria.toString();
        this.actualizarPantalla();
    }

    /**
     * Resta el valor actual de pantalla al valor
     * almacenador en memoria
     */
    mMenos() {
        var numero = this.pantalla;
        if(isNaN(numero))
            alert("La pantalla solo debe contener un número para poder realizar la operación M-")
        else
            this.memoria = this.memoria - Number(numero);
        this.pantalla = this.memoria.toString();
        this.actualizarPantalla();
    }

    /**
     * Suma el valor actual de pantalla al valor
     * almacenador en memoria
     */
    mMas() {
        var numero = this.pantalla;
        if(isNaN(numero))
            alert("La pantalla solo debe contener un número para poder realizar la operación M-")
        else
            this.memoria = this.memoria + Number(numero);
        this.pantalla = this.memoria.toString();
        this.actualizarPantalla();
    }

    borrarPantalla() {
        this.pantalla = "";
        this.actualizarPantalla();
    }
    
    igual() {
        var input;
        var resultado;
        //input = document.getElementById("pantalla").value;
        input = this.pantalla;
        try {
            resultado = eval(input);
            document.getElementById("pantalla").value = resultado;
            this.pantalla = resultado.toString();
        }
        catch (err) { //Cualquier error. No me meto en qué tipo de error
            document.getElementById("pantalla").value = "Error = " + err;
        }
    }
}


class CalculadoraCientifica extends Calculadora {

    constructor() {
        super();
    }

    getNumeroPantalla() {
        var numero = this.pantalla;
        if (isNaN(numero))
            alert("La pantalla solo debe contener un número para poder realizar la operación solicitada");
        else
            return Number(numero);
    }


    /*Funciones instantáneas: se ejecuta el resulta al 
    presionar el botón de la operación sin necesidad de 
    darle al igual*/

    /**
     * Devuelve el seno de un ángulo dado en radianes
     */
    seno() {
        this.pantalla = Math.sin(this.getNumeroPantalla()).toString();
        //Math.sin(numero) - Returns a Number object
        this.actualizarPantalla();
    }

    /**
     * Devuelve el coseno de un ángulo dado en radianes
     */
    coseno() {
        this.pantalla = Math.cos(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();
    }

    tangente() {
        this.pantalla = Math.tan(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();
    }

    arcSeno() {
        this.pantalla = Math.asin(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();
    }

    arcCoseno() {
        this.pantalla = Math.acos(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();

    }

    arcTangente() {
        this.pantalla = Math.atan(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();;
    }

    logaritmo() {
        this.pantalla = Math.log(this.getNumeroPantalla()).toString(); //Logaritmo natural (en base e) de un número
        this.actualizarPantalla();
    }

    logBase10() {
        this.pantalla = Math.log10(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();
    }

    exponencial() {
        this.pantalla = Math.exp(this.getNumeroPantalla()).toString(); //e^x
        this.actualizarPantalla();
    }

    expBase10() {
        this.pantalla = Math.pow(10, this.getNumeroPantalla()).toString(); //10^x
        this.actualizarPantalla();
    }

    cuadrado() {
        this.pantalla = Math.pow(this.getNumeroPantalla(), 2).toString(); //x^2
        this.actualizarPantalla();
    }

    raiz(numero) {
        this.pantalla = Math.sqrt(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();
    }

    signo(numero) { //Probar sin convertir a Number
        this.pantalla = -Number(this.getNumeroPantalla()).toString();
        this.actualizarPantalla();
    }

    //Condicion    
    pi() {
        var numero = this.pantalla;
        if (isNaN(numero)) {
            var ultimoCaracter = pantalla.value.substring(pantalla.value.length - 1, pantalla.value.length)
            debugger;
            if (!isNaN(ultimoCaracter)) {
                this.pantalla = Math.PI.toString();
                this.actualizarPantalla();
            } else {
                this.pantalla = this.pantalla.concat(Math.PI.toString());
                this.actualizarPantalla();
            }
        }
        else {
            this.pantalla = Math.PI.toString();
            this.actualizarPantalla();
        }

    }

    e() {
        var numero = this.pantalla;
        if (isNaN(numero)) {
            var ultimoCaracter = pantalla.value.substring(pantalla.value.length - 1, pantalla.value.length)
            debugger;
            if (!isNaN(ultimoCaracter)) {
                this.pantalla = Math.E.toString();
                this.actualizarPantalla();
            } else {
                this.pantalla = this.pantalla.concat(Math.E.toString());
                this.actualizarPantalla();
            }
        }
        else {
            this.pantalla = Math.E.toString();
            this.actualizarPantalla();
        }
    }

    factorialCalculo(n) {
        return n ? n * this.factorialCalculo(n - 1) : 1;
    }
    
    factorial() {
        if(this.getNumeroPantalla()<0)
            this.pantalla = "Introduzca un número positivo";
        else
            this.pantalla = Number(this.factorialCalculo(this.getNumeroPantalla())).toString();
        this.actualizarPantalla();
    }

    /**
     * Dado un ángulo introducido en grados
     * lo convierte a radianes
     */
    toRad(){
        this.pantalla = ( ( Math.PI * (this.getNumeroPantalla()) )/180 );//.toString();
        this.actualizarPantalla();
    }

    /**
     * Dado un ángulo introducido en radianes
     * lo convierte a grados
     */
    toDegrees(){
        this.pantalla = ( ( this.getNumeroPantalla() * 180 ) / Math.PI );//.toString();
        this.actualizarPantalla();
    }


    //Borra el último caracter introducido
    borrar() {
        this.pantalla = pantalla.value.substring(0, pantalla.value.length - 1); //Probar, alt pantalla.value
        this.actualizarPantalla();
    }

    /**************************************************************** */

    /* Funciones a evaluar: se concatena el operador
    al string de la pantalla. Posteriormente, para realizar
    la evaluación de la expresión de pantalla habrá que 
    presionar la tecla igual */
    modulo() {
        this.pantalla = this.pantalla.concat("%");
        this.actualizarPantalla();
    }

    potencia() {
        this.pantalla = this.pantalla.concat("**");
        this.actualizarPantalla()
    }


    abrirParentesis() {
        this.pantalla = this.pantalla.concat("(");
        this.actualizarPantalla();
    }

    cerrarParentesis() {
        this.pantalla = this.pantalla.concat(")");
        this.actualizarPantalla();
    }

}

/**
 * Calculadora RPN básica
 * 
 * En esta primera versión se asume que todos los operadores (+,-,*,/,%)
 * toman dos argumentos (y no más).
 * 
 * v.1.0 - La pantalla siempre muestra el último valor introducido
 * o calculado. No se resetea en caso de que quiera utilizarse ese valor
 * en operaciones de un solo operando (pulsar n! o mod o función trigonométrica)
 * 
 * Consecuencia: Para introducir un nuevo dígito independiente 
 * después de realizar una operación y que éste no es concatene
 * con el dígito mostrado actualmente en pantalla habrá de limpiarse primero
 * la pantalla (presionar la tecla C, y con la pantalla vacía introducir el nuevo dígito)
 * 
 * Aclaración: La función "igual" de la clase padre Calculadora era llamada
 * desde el botón "=". En CalculadoraRPN.html ese botón no existe y ningún
 * otro botón hace una llamada a la función igual(), por lo tanto no se
 * utiliza nunca eval() en este ejercicio de CalculadoraRPN.
 * No se ha borrado del código, por simular el caso en el que Calculadora (básica)
 * fuese una clase externa y por lo tanto no modificable.
 */
class CalculadoraRPN extends CalculadoraCientifica{
    
    constructor(pila){
        super();
        this.pila = pila;
    }

    enter(){
        var input = document.getElementById("pantalla").value;
        if (isNaN(input))
            alert("Only numbers can be stored in memory") //Probando el objeto predefinido alert() cuyo uso está desaconsejado debido a que muchos usuarios pueden tenerlo deshabilitado en sus navegadores
        else
            this.pila.push(Number(input));
            this.pantalla = ""; //Permite que al iniciar una nueva operación (como escribir un dígito) no se concatene con lo anterior en pantalla
            document.getElementById("pantalla").value = input.toString(); //TODO cambiar para que se muestre toda la pila
            this.actualizarPantallaPila();
            
    }
    
    actualizarResultado(){ //Se redefine este método para implementarlo específico de la calcRPN
        this.pantalla = this.pila.getHead().toString();//showStack();
        document.getElementById("pantalla").value = this.pantalla;
        this.actualizarPantallaPila();
    }

    actualizarPantallaPila(){
        document.getElementById("pila").value = this.pila.showStack(); //TODO cambiar formato
    }

    /**
     * Elimina el uso de eval() para el calculo de las expresiones
     * @param {String} op Caracter que representa la operación a realizar
     */
    operacionRPN(op){

        if(this.pila.isEmpty()){ //Si se acciona un botón de operación con la pila vacía
            
            this.pantalla = "Pila vacía"; //Se informa a través de la pantalla de la calculadora
            this.actualizarPantalla();
            this.pantalla = ""; //Resetea la pantalla para que el usuario pueda introducir el siguiente valor sin tener la necesidad de borrar el mensaje actual en pantalla
            return; //No se realiza operación ninguna

        } else if (this.pila.getLength() < 2){ //Si solo hay un valor en la pila
            
            this.pantalla = "Introduce un segundo valor en la pila primero";
            this.actualizarPantalla(); //Se informa de la necesidad de introducir otro antes de realizar la operación
            this.pantalla = "";
            return;
        }

         //En caso de que haya dos valores o más en la pila:   
        var ultimoValor = this.pila.pop();
        var penultimoValor = this.pila.pop();

        switch (op) { 
            case '+': 
                this.pila.push(penultimoValor + ultimoValor); 
                break; 
  
            case '-': 
                this.pila.push(penultimoValor - ultimoValor); 
                break; 
  
            case '/': 
                this.pila.push(penultimoValor / ultimoValor); 
                break; 
  
            case '*': 
                this.pila.push(penultimoValor * ultimoValor); 
                break;

            case '%': 
                this.pila.push(penultimoValor % ultimoValor); 
                break;

            case '**': 
                this.pila.push(penultimoValor**ultimoValor); 
                break;
            }
        this.actualizarResultado();
    }

    /**********************************************/
    //Los métodos de esta sección sobreescriben a sus correspondientes de la clase padre

    /**
     * Sobreescribe la función suma de la clase padre Calculadora
     * @override
     */
    suma(){
        this.operacionRPN("+");
    }

    resta(){
        this.operacionRPN("-");
    }

    multiplicacion(){
        this.operacionRPN("*");
    }

    division(){
        this.operacionRPN("/");
    }

    modulo(){
        this.operacionRPN("%");
    }

    potencia(){
        this.operacionRPN("**"); 
    }

    /********************************************************/

}


/*

- funciones logarítmicas y sus inversas

Tal y como se muestra en la imagen de la calculadora científica de Windows 10 en el guion de la práctica.*/


//DEBUGGING la pila
var pila = new Stack();
console.log(pila.pop()); //Debe imprimir "Empty Stack"
console.log(pila.isEmpty()); //Debe imprimir "True"
pila.push(1);
pila.push("2");
pila.push(3);
console.log(pila.showStack()); ////Debe imprimir 3, "Segundo" y 1
console.log(pila.pop()); //Debe imprimir 3
console.log(pila.showStack()); //Debe imprimir "Segundo" y 1

var pilaNueva = new Stack();
var calculadora = new CalculadoraRPN(pilaNueva);