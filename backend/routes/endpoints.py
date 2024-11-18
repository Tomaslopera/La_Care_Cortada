from fastapi import APIRouter, HTTPException, Depends
from fastapi import File, UploadFile, Form
from config.db import conn, session
from schemas.models import User, Product, Membership, Photo, Model, Event, Cart
from passlib.context import CryptContext
from sqlalchemy import select, text
from datetime import datetime
from typing import List
import bcrypt
import uuid

endpoints = APIRouter()

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

@endpoints.get("/users/{id}", tags=["users"], description="Get a single user by id", response_model=User)
def get_user(id: str):
    try:
        consulta = text("SELECT * FROM Users WHERE Users.id = :id")
        user_return = session.execute(consulta, {"id" : id}).first()
        if user_return:
            return user_return._asdict()
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

@endpoints.post("/signup", tags=["users"], description="Create a new user")
def sign_up(u: User):
    try:
        new_id = str(uuid.uuid4())
        encripted_password = pwd_context.hash(u.password)
        
        consulta = text('INSERT INTO Users VALUES (:id, :first_name, :last_name, :email, :password);')
        valores = {"id": new_id, "first_name": u.first_name, "last_name": u.last_name, "email": u.email, "password": encripted_password}
        
        session.execute(consulta, valores)      
        session.commit()
        
        consulta = text("SELECT * FROM Users WHERE Users.id = :id")
        return session.execute(consulta, {"id" : new_id}).first()._asdict()
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()

@endpoints.post("/login", tags=["users"], description="Login")
def log_in(email: str, password: str):
    try:
        consulta = text('SELECT * FROM Users WHERE Users.email = :email')
        user = session.execute(consulta, {'email': email}).first()
        if user:
            consulta = text('SELECT password FROM Users WHERE Users.email = :email')
            stored_password = session.execute(consulta, {'email': email}).scalar()
            if pwd_context.verify(password, stored_password):
                consulta = text('SELECT id FROM Users WHERE Users.email = :email')
                user_id = session.execute(consulta, {'email': email}).scalar()
                return user_id
        raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        print(f"Error al insertar en la base de datos: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Crear productos        
@endpoints.post("/products", tags=["products"], description="Create a new product")
def create_product(p: Product):
    try:
        new_id = str(uuid.uuid4())
        consulta = text("INSERT INTO Products (id, name, description, price, image, category) VALUES (:id, :name, :description, :price, :image, :category)")
        values = {"id": new_id, "name": p.name, "description": p.description, "price": p.price, "image": p.image, "category": p.category}
        
        session.execute(consulta, values)
        session.commit()
        return {"id": new_id, "name": p.name, "description": p.description}
    except Exception as e:
        print(f"Error creating product: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener productos
@endpoints.get("/products", tags=["products"], response_model=List[Product], description="Get all products")
def get_products():
    try:
        consulta = text("SELECT * FROM Products")
        products = session.execute(consulta).fetchall()
        
        return products
    except Exception as e:
        print(f"Error fetching products: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener productos por categoría
@endpoints.get("/products/category/{category}", tags=["products"], response_model=List[Product], description="Get products by category")
def get_products_by_category(category: str):
    try:
        consulta = text("SELECT * FROM Products WHERE category = :category")
        products = session.execute(consulta, {"category": category}).fetchall()
        
        return products
    except Exception as e:
        print(f"Error fetching products by category: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener producto por su id
@endpoints.get("/products/{product_name}", tags=["products"], response_model=Product, description="Get a product by name")
def get_product_by_id(product_name: str):
    try:
        consulta = text("SELECT * FROM Products WHERE name = :name")
        product = session.execute(consulta, {"name": product_name}).fetchone()
        
        if product is None:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return product
    except Exception as e:
        print(f"Error fetching product by id: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Modificar producto
@endpoints.put("/products/{product_name}", tags=["products"], description="Update an existing product")
def update_product(product_id: str, p: Product):
    try:
        consulta_id = text("SELECT id FROM Products WHERE name = :name")
        product_id = session.execute(consulta_id, {"name": product_id}).fetchone()
        
        if product_id:
            consulta = text("""UPDATE Products SET name = :name, description = :description, price = :price, image = :image, category = :category WHERE id = :id""")
            values = { "id": product_id, "name": p.name, "description": p.description, "price": p.price, "image": p.image, "category": p.category}
            
            result = session.execute(consulta, values)
            session.commit()
            
            if result.rowcount == 0:
                raise HTTPException(status_code=404, detail="Product not found")
            
            return {"message": "Product updated successfully", "id": product_id}
        else:
            raise HTTPException(status_code=404, detail="Product not found")
    except Exception as e:
        print(f"Error updating product: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Crear Membresía
@endpoints.post("/memberships", tags=["memberships"], description="Create a new membership")
def create_membership(m: Membership):
    try:
        consulta = text("INSERT INTO memberships (name, description, price) VALUES (:name, :description, :price)")
        values = {
            "name": m.name,
            "description": m.description,
            "price": m.price
        }
        session.execute(consulta, values)
        session.commit()
        return {"name": m.name, "description": m.description, "price" : m.price}
    except Exception as e:
        print(f"Error creating membership: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener Membresías
@endpoints.get("/memberships", tags=["memberships"], response_model=List[Membership], description="Get all memberships")
def get_memberships():
    try:
        consulta = text("SELECT * FROM memberships")
        memberships = session.execute(consulta).fetchall()

        return memberships
    except Exception as e:
        print(f"Error fetching memberships: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener Membresías por id
@endpoints.get("/memberships/{id}", tags=["memberships"], response_model=Membership, description="Get a membership by ID")
def get_membership(id: int):
    try:
        consulta = text("SELECT * FROM memberships WHERE id = :id")
        membership = session.execute(consulta, {"id": id}).fetchone()
        
        if membership:
            return membership
        else:
            raise HTTPException(status_code=404, detail="Membership not found")
    except Exception as e:
        print(f"Error fetching membership: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Modificar Membresía
@endpoints.put("/memberships/{id}", tags=["memberships"], description="Update a membership")
def update_membership(id: int, m: Membership):
    try:
        # Actualizar la membresía
        consulta = text("""UPDATE memberships SET name = :name, description = :description, price = :price WHERE id = :id""")
        values = {"name": m.name, "description": m.description, "price": m.price, "id": id}
        
        result = session.execute(consulta, values)
        session.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Membership not found")
        
        return {"id": id, "name": m.name, "description": m.description, "price": m.price}
    except Exception as e:
        print(f"Error updating membership: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Crear una Photo
@endpoints.post("/photos", tags=["photos"], description="Create a new photo")
def create_photo(p: Photo):
    try:
        new_id = str(uuid.uuid4())
        consulta = text("INSERT INTO photos (id, title, description, digital_price, physical_price, categories, tags, available_formats, photographer) VALUES (:id, :title, :description, :digital_price, :physical_price, :categories, :tags, :available_formats, :photographer)")
        values = {"id": new_id, "title": p.title, "description": p.description, "digital_price": p.digital_price, "physical_price": p.physical_price,"categories": p.categories, "tags": p.tags, "available_formats": p.available_formats, "photographer": p.photographer}
        
        session.execute(consulta, values)
        session.commit()
        return {"id": new_id, "title": p.title, "description": p.description}
    except Exception as e:
        print(f"Error creating photo: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener Photos
@endpoints.get("/photos", tags=["photos"], response_model=List[Photo], description="Get all photos")
def get_photos():
    try:
        consulta = text("SELECT * FROM photos")
        photos = session.execute(consulta).fetchall()

        return photos
    except Exception as e:
        print(f"Error fetching photos: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener Photos por su ID
@endpoints.get("/photos/{id}", tags=["photos"], response_model=Photo, description="Get a photo by ID")
def get_photo(id: str):
    try:
        consulta = text("SELECT * FROM photos WHERE id = :id")
        photo = session.execute(consulta, {"id": id}).fetchone()
        
        if photo:
            return photo
        else:
            raise HTTPException(status_code=404, detail="Photo not found")
    except Exception as e:
        print(f"Error fetching photo: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Modificar Photos
@endpoints.put("/photos/{id}", tags=["photos"], description="Update a photo")
def update_photo(id: str, p: Photo):
    try:
        consulta = text("""UPDATE photos SET title = :title, description = :description, digital_price = :digital_price, physical_price = :physical_price, categories = :categories, tags = :tags, available_formats = :available_formats, photographer = :photographer WHERE id = :id""")
        values = {"title": p.title, "description": p.description, "digital_price": p.digital_price, "physical_price": p.physical_price, "categories": p.categories, "tags": p.tags, "available_formats": p.available_formats, "photographer": p.photographer, "id": id}
        
        result = session.execute(consulta, values)
        session.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Photo not found")
        
        return {"id": id, "title": p.title, "description": p.description}
    except Exception as e:
        print(f"Error updating photo: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Crear una modelo
@endpoints.post("/models", tags=["models"], description="Create a new model")
def create_model(m: Model):
    try:
        new_id = str(uuid.uuid4())
        consulta = text("INSERT INTO models (id, name, photos, portfolio, booking_info) VALUES (:id, :name, :photos, :portfolio, :booking_info)")
        values = {"id": new_id, "name": m.name, "photos": m.photos, "portfolio": m.portfolio, "booking_info": m.booking_info}
        
        session.execute(consulta, values)
        session.commit()
        return {"id": new_id, "name": m.name, "portfolio": m.portfolio}
    except Exception as e:
        print(f"Error creating model: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener modelos
@endpoints.get("/models", tags=["models"], response_model=List[Model], description="Get all models")
def get_models():
    try:
        consulta = text("SELECT * FROM models")
        models = session.execute(consulta).fetchall()

        return models
    except Exception as e:
        print(f"Error fetching models: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener una modelo por su id
@endpoints.get("/models/{id}", tags=["models"], response_model=Model, description="Get a model by ID")
def get_model(id: str):
    try:
        consulta = text("SELECT * FROM models WHERE id = :id")
        model = session.execute(consulta, {"id": id}).fetchone()
        
        if model:
            return model
        else:
            raise HTTPException(status_code=404, detail="Model not found")
    except Exception as e:
        print(f"Error fetching model: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Modificar una modelo
@endpoints.put("/models/{id}", tags=["models"], description="Update a model")
def update_model(id: str, m: Model):
    try:
        consulta = text("""UPDATE models SET name = :name, photos = :photos, portfolio = :portfolio, booking_info = :booking_info WHERE id = :id""")
        
        values = {"name": m.name, "photos": m.photos, "portfolio": m.portfolio, "booking_info": m.booking_info, "id": id}
        
        result = session.execute(consulta, values)
        session.commit()

        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Model not found")
        
        return {"id": id, "name": m.name, "portfolio": m.portfolio}
    except Exception as e:
        print(f"Error updating model: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Crear un evento
@endpoints.post("/events", tags=["events"], description="Create a new event")
def create_event(e: Event):
    try:
        new_id = str(uuid.uuid4())
        consulta = text("INSERT INTO events (id, name, event_date, location) VALUES (:id, :name, :event_date, :location)")
        values = {"id": new_id, "name": e.name, "event_date": e.date,"location": e.location}
        session.execute(consulta, values)
        
        for model in e.models:
            consulta_models = text("INSERT INTO EventModels (event_id, model_id) VALUES (:event_id, :model_id)")
            values_models = {"event_id": new_id, "model_id": model}
            session.execute(consulta_models, values_models)
        
        for products in e.products:
            consulta_products = text("INSERT INTO EventProducts (event_id, product_id) VALUES (:event_id, :product_id)")
            values_products = {"event_id": new_id, "product_id": products}
            session.execute(consulta_products, values_products)
        
        session.commit()
        return {"id": new_id, "name": e.name, "date": e.date, "location": e.location, "models" : e.models, "products" : e.products}
    except Exception as e:
        print(f"Error creating event: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener todos los eventos y su información
@endpoints.get("/events", tags=["events"], description="Get all events")
def get_all_events():
    try:
        consulta = text('''SELECT 
                        e.name AS event_name, 
                        e.event_date AS event_date, 
                        e.location AS event_location, 
                        GROUP_CONCAT(DISTINCT p.name SEPARATOR', ') AS products, 
                        GROUP_CONCAT(DISTINCT m.name SEPARATOR ', ') AS models 
                        FROM 
                            Events e 
                        LEFT JOIN EventProducts ep ON e.id = ep.event_id 
                        LEFT JOIN Products p ON ep.product_id = p.id 
                        LEFT JOIN EventModels em ON e.id = em.event_id 
                        LEFT JOIN Models m ON em.model_id = m.id 
                        GROUP BY 
                            e.id''')
        eventos = session.execute(consulta).fetchall()
        
        eventos_dict = []
        for event in eventos:
            eventos_dict.append({
                "event_name": event.event_name,
                "event_date": event.event_date,
                "event_location": event.event_location,
                "products": event.products,
                "models": event.models
            })
        
        return eventos_dict
    except Exception as e:
        print(f"Error fetching events: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Obtener un evento por su id
@endpoints.get("/events/{event_id}", tags=["events"], description="G")
def get_all_events(event_id: str):
    try:
        consulta = text('''SELECT 
                        e.name AS event_name, 
                        e.event_date AS event_date, 
                        e.location AS event_location, 
                        GROUP_CONCAT(DISTINCT p.name SEPARATOR', ') AS products, 
                        GROUP_CONCAT(DISTINCT m.name SEPARATOR ', ') AS models 
                        FROM 
                            Events e 
                        LEFT JOIN EventProducts ep ON e.id = ep.event_id 
                        LEFT JOIN Products p ON ep.product_id = p.id 
                        LEFT JOIN EventModels em ON e.id = em.event_id 
                        LEFT JOIN Models m ON em.model_id = m.id
                        WHERE e.id = :event_id
                        GROUP BY 
                            e.id''')
        eventos = session.execute(consulta, {"event_id" : event_id}).fetchall()
        
        eventos_dict = []
        for event in eventos:
            eventos_dict.append({
                "event_name": event.event_name,
                "event_date": event.event_date,
                "event_location": event.event_location,
                "products": event.products,
                "models": event.models
            })
        
        return eventos_dict
    except Exception as e:
        print(f"Error fetching events: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        session.close()


# Modificar un evento
@endpoints.put("/events/{event_id}", tags=["events"], description="Update an event and its models and products")
def update_event(event_id: str, e: Event):
    try:
        consulta_event = text('''UPDATE events SET name = :name, event_date = :event_date, location = :location WHERE id = :id''')
        values_event = {"id": event_id, "name": e.name, "event_date": e.date, "location": e.location}
        session.execute(consulta_event, values_event)
        
        consulta_delete_models = text('''DELETE FROM EventModels WHERE event_id = :event_id''')
        consulta_delete_products = text('''DELETE FROM EventProducts WHERE event_id = :event_id''')
        session.execute(consulta_delete_models, {"event_id": event_id})
        session.execute(consulta_delete_products, {"event_id": event_id})

        for model in e.models:
            consulta_models = text('''INSERT INTO EventModels (event_id, model_id) VALUES (:event_id, :model_id)''')
            values_models = {"event_id": event_id, "model_id": model}
            session.execute(consulta_models, values_models)
        
        for product in e.products:
            consulta_products = text('''INSERT INTO EventProducts (event_id, product_id) VALUES (:event_id, :product_id)''')
            values_products = {"event_id": event_id, "product_id": product}
            session.execute(consulta_products, values_products)

        session.commit()
        return {"id": event_id, "name": e.name, "date": e.date, "location": e.location, "models": e.models, "products": e.products}
    
    except Exception as ex:
        print(f"Error updating event: {ex}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    finally:
        session.close()

