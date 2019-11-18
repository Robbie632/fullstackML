/*When the below code is run it will log 'start', '0hello', '5hello', 'stop'
the reason its printed in this order is because functions go in the call stack,
one by one, unless they are callbacks in which case they'll go in the node API,
when the callback functions are ready to return a value they go in the
callback queue, the event loop then looks in the call stackand callback que,
if there is anything in the call stack then it executes This
only when there is nothing left in the call stack the event loop will execute
whats waiting in the callback queue*/



//load modules
console.log('start')


setTimeout(() => {
    /*this functions takes in the arrowhead function as a callback, waits the
    defined time, then executes the arrowhead function, so in this case the
    terminal would show 'start', 'stop' then 'hello'. This is a very simple
    example of synchronicity but imagine if this was requesting data from a
    database*/
    console.log('5hello')

}, 2000)

setTimeout(() => {
    /*this functions takes in teh arrowhead function as a callback, waits the
    defined time, then executes the arrowhead function, so in this case the
    terminal would show 'start', 'stop' then 'hello'. This is a very simple
    example of synchronicity but imagine if this was requesting data from a
    database*/
    debugger
    console.log('0hello')

}, 0)

console.log('stop')
