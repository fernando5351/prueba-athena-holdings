const Sidebar = () => {

  return (
    <div>
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Menu
        </button>

        <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">Opciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body col-6">
            <a href="/" type="button" className="btn btn-outline-info btn-block mb-2 d-flex align-items-center custom-width">
              <i className="fa-solid fa-list-check me-2"></i> Task
            </a>
            <a href="/user" type="button" className="btn btn-outline-info btn-block d-flex align-items-center custom-width">
              <i className="fa-solid fa-user me-2"></i> User
            </a>
          </div>
        </div>
    </div>
  );
};

export default Sidebar;
