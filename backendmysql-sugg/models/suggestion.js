const { pool } = require("../config/database");

class Suggestion {
  // Récupérer toutes les suggestions
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM suggestions ORDER BY date DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Récupérer une suggestion par ID
  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM suggestions WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Créer une nouvelle suggestion
  static async create(data) {
    try {
      const { title, description, category, status } = data;
      const [result] = await pool.query(
        "INSERT INTO suggestions (title, description, category, status) VALUES (?, ?, ?, ?)",
        [title, description || "", category || "", status || "en attente"]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Mettre à jour une suggestion
  static async update(id, data) {
    try {
      const { title, description, category, status, nbLikes } = data;
      const [result] = await pool.query(
        "UPDATE suggestions SET title = ?, description = ?, category = ?, status = ?, nbLikes = ? WHERE id = ?",
        [title, description, category, status, nbLikes, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Supprimer une suggestion
  static async delete(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM suggestions WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Incrémenter les likes
  static async incrementLikes(id) {
    try {
      const [result] = await pool.query(
        "UPDATE suggestions SET nbLikes = nbLikes + 1 WHERE id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Mise à jour partielle (PATCH), ex: { nbLikes }
  static async patch(id, data) {
    try {
      const fields = [];
      const values = [];
      if (data.nbLikes !== undefined) {
        fields.push("nbLikes = ?");
        values.push(data.nbLikes);
      }
      if (data.title !== undefined) {
        fields.push("title = ?");
        values.push(data.title);
      }
      if (data.description !== undefined) {
        fields.push("description = ?");
        values.push(data.description);
      }
      if (data.category !== undefined) {
        fields.push("category = ?");
        values.push(data.category);
      }
      if (data.status !== undefined) {
        fields.push("status = ?");
        values.push(data.status);
      }
      if (fields.length === 0) return null;
      values.push(id);
      const [result] = await pool.query(
        `UPDATE suggestions SET ${fields.join(", ")} WHERE id = ?`,
        values
      );
      if (result.affectedRows === 0) return null;
      return this.getById(id);
    } catch (error) {
      throw error;
    }
  }

  // Rechercher par catégorie
  static async findByCategory(category) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM suggestions WHERE category = ? ORDER BY date DESC",
        [category]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Rechercher par statut
  static async findByStatus(status) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM suggestions WHERE status = ? ORDER BY date DESC",
        [status]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Suggestion;
