"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import UpdateCategoryForm, { Category as CategoryType } from "./UpdateCategoryForm";

const API_URL = "http://192.168.1.16:3000/api/category";

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [form, setForm] = useState<CategoryType>({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setCategories(data);
    } catch (err) {
      console.error("Lỗi khi fetch danh mục:", err);
      setError("Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Tên danh mục không được để trống");
      return;
    }

    try {
      if (form.id) {
        await axios.put(`${API_URL}/${form.id}`, form); // ✅ ID trong URL
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", description: "" });
      fetchCategories();
    } catch (err) {
      console.error("Lỗi khi gửi form:", err);
      setError("Không thể lưu danh mục");
    }
  };

  const handleEdit = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      setError("Không thể xóa danh mục");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 30 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Quản lý danh mục
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit} mb={4}>
        <TextField
          label="Tên danh mục"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Button type="submit" variant="contained" color="primary">
          {form.id ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Box>

      {loading ? (
        <Box textAlign="center" py={3}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Tên</strong></TableCell>
                <TableCell><strong>Mô tả</strong></TableCell>
                <TableCell><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>{cat.description}</TableCell>
                  <TableCell>
                    <Button size="small" color="primary" onClick={() => handleEdit(cat)}>Sửa</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(cat.id!)}>Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">Không có danh mục nào</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog cập nhật */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Cập nhật danh mục</DialogTitle>
        <DialogContent>
          <UpdateCategoryForm
            selectedCategory={selectedCategory}
            onUpdated={() => {
              fetchCategories();
              handleCloseDialog();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
