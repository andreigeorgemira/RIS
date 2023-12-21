document.addEventListener("DOMContentLoaded", function () {
  // Obtén referencias a elementos del DOM
  var modal = document.querySelector(".modal");
  var openModalButton = document.querySelector("#openModalButton");

  // Función para abrir el modal
  function openModal() {
    modal.innerHTML = `
    <div id="content" class="modal-content">
        <div id="head" class="modal-header">
          <h2 class="modal-title"><b>NHC</b> COGNOM,NOM</h2>
          <button class="btn-close" id="tancar" type="button"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <h4>Dades de la prova</h4>
            </div>
            <div class="col-6">
              <h4>Realització</h4>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-6 col-form-label">
              HOLA
              <div class="col-12">
                <input class="form-control" />
              </div>
            </div>

            <div class="col-6 col-form-label">
              HOLA
              <div class="col-12">
                <input class="form-control" />
              </div>
            </div>

            <div class="col-4 col-form-label">
              HOLA
              <div class="col-12">
                <input class="form-control" />
              </div>
            </div>

            <div class="col-2 col-form-label">
              HOLA
              <div class="col-12">
                <input class="form-control" />
              </div>
            </div>

            <div class="col-6 col-form-label">
              HOLA
              <div class="col-12">
                <input class="form-control" />
              </div>
            </div>

            <div class="col-6 col-form-label">
              HOLA
              <div class="col-12">
                <textarea class="form-control"></textarea>
              </div>
            </div>

            <div class="col-6 col-form-label">
              HOLA
              <div class="col-12">
                <textarea class="form-control"></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 col-form-label">
              <div class="col-12">
                <table class="table table-hover">
                  <thead class="thead-inversed">
                    <tr>
                      <th>PROVA</th>
                      <th>PROJECCIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-6 text-right">
              <div class="alert alert-danger text-center">
                <b>El pacient te més d'una prova pendent per avui</b><br />
                <div class="text-left">
                  <ul></ul>
                </div>
              </div>
              <button class="btn btn-lg btn-secondary hand col-6" type="button">
                <span>Enviar a WorkList</span>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="col-12">
                <span class="hand">Veure estudis anteriors</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary hand" id="tancar" type="button">Tancar</button>
          </div>
        </div>
      </div>
    `;

    var closeButtons = document.querySelectorAll("#tancar");

    closeButtons.forEach(function (closeButton) {
      closeButton.addEventListener("click", closeModal);
    });
    modal.style.display = "flex";
  }

  // Función para cerrar el modal
  function closeModal() {
    var modalFooterButton = modal.querySelector("#tancar");
    modalFooterButton.removeEventListener("click", closeModal);
    modal.innerHTML = "";
    modal.style.display = "none";
  }

  // Asocia eventos a los botones
  openModalButton.addEventListener("click", openModal);
});
