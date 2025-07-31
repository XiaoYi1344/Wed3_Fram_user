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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import toast from "react-hot-toast";
import UpdateCategoryForm, {
  Category as CategoryType,
} from "./UpdateCategoryForm";

const API_URL = "http://192.168.1.31:3000/api/category";

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [form, setForm] = useState<CategoryType>({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setCategories(data);
    } catch (error) {
      console.error("Lỗi khi fetch danh mục:", error);
      toast.error("Không thể tải danh sách danh mục");
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
      toast.error("Tên danh mục không được để trống");
      return;
    }

    try {
      if (form.id) {
        await axios.put(`${API_URL}/${form.id}`, form);
        toast.success("Cập nhật danh mục thành công");
      } else {
        await axios.post(API_URL, form);
        toast.success("Thêm danh mục thành công");
      }
      setForm({ name: "", description: "" });
      fetchCategories();
    } catch (err) {
      console.error("Lỗi khi gửi form:", err);
      toast.error("Không thể lưu danh mục");
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
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Đã xóa danh mục");
      fetchCategories();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      toast.error("Không thể xóa danh mục");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 20 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Quản lý danh mục
      </Typography>

      {/* Form thêm mới */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Thêm danh mục
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
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
          <Box mt={2} textAlign="right">
            <Button type="submit" variant="contained" color="primary">
              {form.id ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Danh sách danh mục */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Danh sách danh mục
        </Typography>

        {loading ? (
          <Box textAlign="center" py={3}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Tên</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Mô tả</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Hành động</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.description}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={() => handleEdit(cat)}
                      >
                        Sửa
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(cat.id!)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Không có danh mục nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Dialog cập nhật */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cập nhật danh mục</DialogTitle>
        <DialogContent>
          <UpdateCategoryForm
            selectedCategory={selectedCategory}
            onUpdated={() => {
              fetchCategories();
              handleCloseDialog();
              toast.success("Danh mục đã được cập nhật");
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
