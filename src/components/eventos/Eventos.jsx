import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./eventos.css";
import { Profile } from "../profile/Profile";
import Swal from "sweetalert2";

export const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const { isAuthenticated } = useAuth0();

  const getEventos = () => {
    fetch("https://api-eventos-3-w.onrender.com/eventos")
      .then((res) => res.json())
      .then((res) => setEventos(res));
  };

  useEffect(() => {
    getEventos();
  }, []);

  const handleDelete = (id) => {
    const requestInit = {
      method: "DELETE",
    };
    fetch("https://api-eventos-3-w.onrender.com/eventos/" + id, requestInit)
      .then((res) => res.text())
    getEventos();

    let timerInterval;
    Swal.fire({
      title: "Eliminando evento",
      html: "Evento eliminado en <b></b> milisegundos.",
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
  };

  /* const handleEdit = (evento, id) => {

    const data = {};
    data["titulo"] = evento.titulo;
    data["descripcion"] = evento.descripcion;
    data["fecha"] = evento.fecha;
    data["hora"] = evento.hora;
    data["ubicacion"] = evento.ubicacion;
    data["categoria"] = evento.categoria;

    console.log("ID recibido para edición:", id);
    console.log("Datos enviados en la solicitud:", data);

    const url = "https://api-eventos-3-w.onrender.com/eventos/" + id;
    fetch(url, {
      method: "PUT",
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
          alert("evento editado con exito");
          getEventos();
        } else {
          alert("a ocurrido un error");
        }
      })
      .catch((error) => {
        const err = error.message;
        alert("la accion no se pudo ejecutar", err);
      });
  }; */

  return (
    <>
      <Profile />
      <fieldset className="fieldseteventos">
        <legend className="legendeventos">
          Eventos a los que puedes asistir
        </legend>
        <table className="taeventos">
          <thead className="theadeventos">
            <tr className="theadtreventos">
              <th className="thtieventos">Titulo</th>
              <th className="thdeeventos">Descripcion</th>
              <th className="thfeeventos">Fecha</th>
              <th className="thhoeventos">Hora</th>
              <th className="thubeventos">Ubicacion</th>
              <th className="thcaeventos">Categoria</th>
              {isAuthenticated ? (
                <th className="">Eliminar{/*  o editar */}</th>
              ) : (
                <th className="">Confirmar asistencia</th>
              )}
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr className="tbodytreventos" key={evento.id}>
                <th className="tbtieventos">{evento.titulo}</th>
                <th className="tbdeeventos">{evento.descripcion}</th>
                <th className="tbfeeventos">{evento.fecha}</th>
                <th className="tbhoeventos">{evento.hora}</th>
                <th className="tbudeventos">{evento.ubicacion}</th>
                <th className="tbcaeventos">{evento.categoria}</th>

                {isAuthenticated ? (
                  <th>
                    <button
                      className="boeleventos"
                      onClick={() => handleDelete(evento.id)}
                    >
                      <i className="fa-solid fa-square-xmark"></i>
                    </button>

                    {/* <button
                    className="boeleventos"
                    onClick={() => handleEdit(evento, evento.id)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button> */}
                  </th>
                ) : (
                  <th>
                    <button className="boeleventos">
                      <i className="fa-solid fa-envelope"></i>
                    </button>
                  </th>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </>
  );
};
