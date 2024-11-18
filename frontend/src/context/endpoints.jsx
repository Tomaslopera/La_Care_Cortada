import axios from "axios"

import { createContext, useContext, useState } from "react"
import { validarEmail, validarPassword } from "../functions/Formularios";

const API_BASE_URL = 'http://localhost:8000';
const userContext = createContext();

export const useUser = () => {
    const context = useContext(userContext)
    if(!context) throw new Error("No hay un provider")
    return context
}


export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [firstNameUsuario, setNombreUsuario] = useState(localStorage.getItem("firstNameUsuario") || "Anonymous");
    const [emailUsuario, setEmailUsuario] = useState(localStorage.getItem("emailUsuario") || "");

    const actualizarStorage = (usuario) => {
        localStorage.setItem("userData", usuario.id);
        localStorage.setItem("firstName", usuario.first_name)
        localStorage.setItem("lastName", usuario.last_name)
        localStorage.setItem("emailUsuario", usuario.email)
    };

    const getUser = async (id) => {
        try {
            const return_id = localStorage.getItem("userData");
            const response = await axios.get(`${API_BASE_URL}/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const signUp = async ({ first_name, last_name, email, password, confirmPassword }) => {
        try {
            if (!validarEmail(email)) return "Email no valido";
            if (!validarPassword(password)) return "La contraseña debe contener: Al menos 8 caracteres, Al menos 1 letra mayúscula, Al menos 1 letra minuscula, Al menos 1 número, Al menos un caracter especial";
            if (password != confirmPassword) return "Las contraseñas no coinciden";

            const response = await axios.post(`${API_BASE_URL}/signup`, {
                first_name,
                last_name,
                email,
                password
            });

            if (response.data == null)  return "Usuario o correo existente";

            const usuario = response.data;
            actualizarStorage(usuario);

            return usuario;
        } catch (error) {
            console.log(error)
            throw new Error("Intentelo más tarde");         
        }
    }
    
    const login = async ({ email, password }) => {
        try {
            if (!validarPassword(password)) return "La contraseña debe contener: \n Al menos 8 caracteres \n Al menos 1 letra mayúscula \n Al menos 1 letra minuscula \n Al menos 1 número \n Al menos un caracter especial";

            const response = await axios.post(
                                `${API_BASE_URL}/login`,
                                { email, password }
            );
            
            if (response.data==null)  return "Username o contraseña incorrectos";
            
            const usuario = response.data;
            console.log(usuario.first_name)
            console.log(usuario.last_name)
            actualizarStorage(usuario);

            return usuario;
        } catch (error) {
            console.log(error)
            throw new Error("Intentelo más tarde");
        }
    }

    
    const addProduct = async ( nombre, descripcion, price, image, category ) => {
        try {

            const response = await axios.post(`${API_BASE_URL}/add_products`, {
                                        name: nombre,
                                        description: descripcion,
                                        price: price,
                                        image: image,
                                        category: category,
                                        });

            console.log(response.data)

            if (response.data == null)  return "Producto no creado";

            return response.data;
        } catch (error) {
            console.error(error)
            console.log("Intentelo más tarde")
        }
    }

    const getProduct = async ( name ) => {
        try {

            const response = await axios.get(`${API_BASE_URL}/product/` + name)

            if (response.data == null)  return "Hubo Error Obteniendo el Producto";

            const producto = response.data;
            
            return producto;
        } catch (error) {
            console.error(error)
            console.log("Intentelo más tarde")
        }
    }
    
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/products`)

            if (response.data == null)  return "No existen productos";

            const productos = response.data;
            
            return productos;
        } catch (error) {
            console.error(error)
            console.log("Intentelo más tarde")
        }
    }

    return (
        <userContext.Provider
            value={{
                user,
                signUp,
                getUser,
                login,
                setUser,
                addProduct,
                searchProduct,
                getAllProducts,
                getProduct,
                firstNameUsuario,
                emailUsuario
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}