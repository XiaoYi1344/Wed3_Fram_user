"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button, Alert, Box } from "@mui/material";
import axios from "axios";

export interface Category {
  id?: number;
  name: string;
  description: string;
}

interface UpdateCategoryFormProps {
  selectedCategory: Category | null;
  onUpdated: () => void;
}

const API_URL = "http://192.168.1.16:3000/api/category";

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
  selectedCategory,
  onUpdated,
}) => {
  const [form, setForm] = useState<Category>({ name: "", description: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      setForm(selectedCategory);
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name.trim()) {
    setError("Tên danh mục không được để trống");
    return;
  }

  try {
    if (form.id !== undefined && form.id !== null) {
      // PUT với id trong URL (nếu backend yêu cầu vậy)
      await axios.put(`${API_URL}/${form.id}`, {
        name: form.name,
        description: form.description,
      });
    } else {
      setError("Thiếu ID để cập nhật danh mục");
      return;
    }

    onUpdated();
  } catch (err) {
    console.error("Lỗi khi cập nhật:", err);
    setError("Cập nhật thất bại");
  }
};


  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Tên danh mục"
        fullWidth
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Mô tả"
        fullWidth
        multiline
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        margin="normal"
      />

      <Box mt={2} textAlign="right">
        <Button type="submit" variant="contained" color="primary">
          Cập nhật
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateCategoryForm;
