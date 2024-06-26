import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "../profile/Profile";
import "./crearEvento.css";
import Swal from "sweetalert2";

export const CrearEvento = () => {
  const { isAuthenticated } = useAuth0();
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {};
    data["titulo"] = e.target.titulo.value;
    data["descripcion"] = e.target.descripcion.value;
    data["fecha"] = e.target.fecha.value;
    data["hora"] = e.target.hora.value;
    data["ubicacion"] = e.target.ubicacion.value;
    data["categoria"] = e.target.categoria.value;

    const url = "https://api-eventos-3-w.onrender.com/eventos";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    })
      .then(async (r) => {
        const data = await r.json();
        return {
          status: r.status,
          body: data,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          let timerInterval;
          Swal.fire({
            title: "Creando evento",
            html: "Evento creado en <b></b> milisegundos.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 500);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          })
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "A ocurrido un error intentelo nuevamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        const err = error.message;
        Swal.fire({
          title: "A ocurrido un error",
          text: "La accion no se pudo ejecutar",
          icon: "question",
        });
        console.log(err)
      });
  };

  return (
    <>
      <Profile />
      {isAuthenticated ? (
        <>
          <fieldset className="formcrearevento">
            <legend className="lefocrearevento">
              {" "}
              Crea un evento para que las personas puedan asistir{" "}
            </legend>
            <form className="focrearevento" onSubmit={handleSubmit}>
              <div className="difocrearevento">
                <label htmlFor="titulo" className="lafocrearevento">
                  Titulo
                </label>
                <input
                  type="text"
                  name="titulo"
                  className="infocrearevento infocreareventoti"
                  required
                  maxLength="30"
                />
              </div>

              <div className="difocrearevento">
                <label htmlFor="descripcion" className="lafocrearevento">
                  Descripcion
                </label>
                <input
                  type="text"
                  name="descripcion"
                  className="infocrearevento infocreareventode"
                  required
                  maxLength="100"
                />
              </div>

              <div className="difocrearevento">
                <label htmlFor="fecha" className="lafocrearevento">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  className="infocrearevento infocreareventofe"
                  required
                />
              </div>

              <div className="difocrearevento">
                <label htmlFor="hora" className="lafocrearevento">
                  Hora
                </label>
                <input
                  type="time"
                  name="hora"
                  className="infocrearevento infocreareventoho"
                  required
                />
              </div>

              <div className="difocrearevento">
                <label htmlFor="ubicacion" className="lafocrearevento">
                  Ubicacion
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  className="infocrearevento infocreareventoub"
                  required
                  maxLength="50"
                />
              </div>

              <div className="difocrearevento">
                <label htmlFor="categoria" className="lafocrearevento">
                  Categoria
                </label>
                <select
                  className="infocrearevento infocreareventoca"
                  name="categoria"
                  required
                >
                  <option>Disfraces</option>
                  <option>Baby Shower</option>
                  <option>Boda</option>
                  <option>15 Años</option>
                  <option>Cumpleaños</option>
                  <option>Aniversario</option>
                </select>
              </div>

              <button type="submit" className="loginbuton bolocrearevento">
                Crear evento
              </button>
            </form>
          </fieldset>{" "}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
