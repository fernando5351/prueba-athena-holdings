import React from 'react';

const User = () => {
    return (
        <div className="container mt-5 shadow">
            <div className="mt-2 m-2">
                <h1>Informacion del usuario</h1>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label"><i className="fas fa-user me-2"></i>Nombre:</label>
                        <input type="text" className="form-control" id="firstName" value="Isaac Fernando" readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label"><i className="fas fa-user me-2"></i>Apellido:</label>
                        <input type="text" className="form-control" id="lastName" value="Fernandez Bailon" readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label"><i className="fas fa-phone me-2"></i>Teléfono:</label>
                        <input type="text" className="form-control" id="phone" value="6456-3657" readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><i className="fas fa-envelope me-2"></i>Correo electrónico:</label>
                        <input type="email" className="form-control" id="email" value="isaacfernandofernandez5351@gmail.com" readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
