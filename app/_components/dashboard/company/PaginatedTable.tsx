"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import TextField from "../../common/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUserCompany,
  DeleteUserCompany,
} from "@/app/_redux/slices/companySlice";
import { useTranslation } from "react-i18next";

const PaginatedTable = ({ users }: any) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination values
  const totalPages = Math.ceil(users?.length / itemsPerPage) || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = users.slice(startIndex, endIndex);

  // Handle page changes
  const goToPage = (page: any) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const { companyData } = useSelector((state: any) => state.companySlice);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ mode: "onBlur" });
  const dispatch = useDispatch<any>();

  const onSubmit: SubmitHandler<any> = (data: any) => {
    dispatch(AddUserCompany(data))
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  const DeleteUserCompanyFunction = (userId: string) => {
    dispatch(DeleteUserCompany({ userId }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4 d-flex justify-content-end">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-warning mb-1"
        >
          <Plus className="w-4 h-4" />
          {t("paginatedTable.addUser")}
        </Button>
      </div>

      {companyData.users && (
        <div className="shadow-sm border rounded-lg overflow-hidden w-100">
          <Table
            striped
            bordered
            hover
            className="w-full table-auto w-100 mb-0"
          >
            <thead className="bg-gray-50 border-b w-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {t("paginatedTable.userCode")}
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {t("paginatedTable.email")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 text-center">
                  {t("paginatedTable.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item: any) => (
                <tr key={item.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.userCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 text-center">
                    <FaTrash
                      color="red"
                      className="pointer"
                      onClick={() => {
                        DeleteUserCompanyFunction(item.userId);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t("paginatedTable.previous")}
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 bg-white border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("paginatedTable.next")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("paginatedTable.addUser")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-3">
              <Col md={12}>
                <TextField
                  label={t("paginatedTable.userEmail")}
                  name="email"
                  register={register}
                  errors={errors}
                  required
                  minLength={3}
                  maxLength={50}
                />
              </Col>
              <div className="d-flex justify-content-end">
                <Button type="submit" className="main-btn m-2">
                  {t("paginatedTable.addUser")}
                </Button>
              </div>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaginatedTable;
