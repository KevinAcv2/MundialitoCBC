from flask import Flask, jsonify
from flask_cors import CORS  # Importa CORS
import pymysql

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

# Configuración directa (solo para desarrollo)
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = '25112003'
DB_NAME = 'MundialitoCBC'

@app.route("/api/posiciones", methods=['GET'])  # Cambiado a la ruta que espera el frontend
def mostrar_tabla():
    try:
        conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASS, db=DB_NAME)
        cur = conn.cursor()
        cur.execute("SELECT * FROM Tabla_Posiciones")
        datos = cur.fetchall()
        
        # Convertir los datos a un formato más útil
        columnas = [column[0] for column in cur.description]
        resultados = []
        for dato in datos:
            resultados.append(dict(zip(columnas, dato)))
        
        return jsonify(resultados)  # Devuelve directamente los datos en formato adecuado
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # Especifica el puerto 5000 explícitamente