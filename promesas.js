function promesasEncadenadas() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
        resolve(numeroAleatorio);
      }, 2000);
    })
    .then(numero => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const resultado = numero ** 2;
          resolve(resultado);
        }, 3000);
      });
    })
    .then(resultado => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const raizCuadrada = Math.sqrt(resultado);
          resolve(raizCuadrada);
        }, 1000);
      });
    });
  }
  
  promesasEncadenadas()
    .then(resultado => {
      console.log("resultado final:", resultado);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  //----------------
  function realizarSolicitudes(urls) {
    const promesas = urls.map(url => {
      return fetch(url).then(response => response.json());
    });
  
    return Promise.all(promesas);
  }
  
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  realizarSolicitudes(urls)
    .then(resultados => {
      console.log("resultados de las solicitudes:", resultados);
    })
    .catch(error => {
      console.error("rrror:", error);
    });
  
  //----------------
  function promesasParalelas(funcionesPromesa) {
    const promesas = funcionesPromesa.map(func => func());
  
    return Promise.all(promesas);
  }
  
  const promesa1 = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('promesa 1 resuelta');
      }, 2000);
    });
  };
  
  const promesa2 = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('promesa 2 resuelta');
      }, 3000);
    });
  };
  
  promesasParalelas([promesa1, promesa2])
    .then(resultados => {
      console.log("resultados de las promesas:", resultados);
    })
    .catch(error => {
      console.error("error:", error);
    });
    //----------------
    function promesasConRetraso(n) {
        const promesas = [];
      
        for (let i = 1; i <= n; i++) {
          const promesa = new Promise(resolve => {
            setTimeout(() => {
              console.log("numero en la promesa:", i);
              resolve(i);
            }, i * 1000);
          });
      
          promesas.push(promesa);
        }
      
        return Promise.all(promesas).then(() => {
          return "todas las promesas se resolvieron";
        });
      }
      
      promesasConRetraso(5)
        .then(resultado => {
          console.log(resultado);
        })
        .catch(error => {
          console.error("error:", error);
        });
      
    //----------------
    function promesaConCancelacion() {
        let promesaCancelada = false;
      
        const promesa = new Promise((resolve, reject) => {
          const timerId = setTimeout(() => {
            if (!promesaCancelada) {
              resolve("la promesa se resolvio");
            } else {
              reject("promesa cancelada");
            }
          }, 5000);
      
          promesa.cancel = () => {
            clearTimeout(timerId);
            promesaCancelada = true;
          };
        });
      
        return promesa;
      }
      
      const miPromesa = promesaConCancelacion();
      miPromesa
        .then(resultado => {
          console.log(resultado);
        })
        .catch(error => {
          console.error(error);
        });
      
      miPromesa.cancel();
      