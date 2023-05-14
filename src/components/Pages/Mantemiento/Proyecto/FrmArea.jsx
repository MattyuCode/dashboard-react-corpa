
const FrmArea = () => {
    return (
        <div className="tab-pane fade show active" id="tabBusqueda" role="tabpanel">
            <div id="divBusqueda">
                <div className="row">
                    <div className="col-md-12 text-center">

                        <div id="formulario1">



                            <div className="row">


                                <div className="col-md-6">
                                    <div class="form-group">
                                        <span>SubProyecto</span>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Seleccionar Sub Proyecto</option>
                                            <option value="1">Proyecto 1</option>
                                            <option value="2">Proyecto 2</option>
                                            <option value="3">Proyecto3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div class="form-group">
                                        <span>Nombre</span>
                                        <input class="form-control" type="text" />
                                    </div>
                                </div>
                            </div>

                        </div>



                        <br />
                        <div className="row">

                            <div className="col-md-6">
                                <div class="form-group">
                                    <span>DESCRIPCION</span>

                                    <textarea class="form-control" aria-label="With textarea"></textarea>
                                </div>

                            </div>

                            <div className="col-md-4">
                                <div class="form-group">
                                    <button type="button" class="btn btn-success btn-lg">Guardar</button>
                                </div>
                            </div>

                            <div className="col-md-4">

                            </div>

                            <div className="col-md-4">

                            </div>
                        </div>

                        <br />
                    </div>
                </div>
            </div>


        </div>
    );
}

export default FrmArea
