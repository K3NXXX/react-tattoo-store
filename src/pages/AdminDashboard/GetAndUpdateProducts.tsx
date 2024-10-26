import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import style from "./Admin.module.scss";
import { productsService } from "../../services/products.service";
import { IProduct } from "../../types/product.type";
import { toast } from "react-toastify";

const GetAndUpdateProducts: React.FC = () => {
  const { data, error, isLoading } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: () => productsService.getAll(),
  });

  const { mutate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: (data: IProduct) => productsService.update(data._id, data),
    onSuccess: () => {
      toast.success("Товар оновлено успішно");
    },
    onError: (error: any) => {
      toast.error(error.response.data.error);
    },
  });

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>(data || []);

  const handleEditClick = (product: IProduct) => {
    setEditingProductId(product._id);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    product: IProduct,
  ) => {
    const updatedProducts = products.map((p) =>
      p._id === product._id ? { ...p, [e.target.name]: e.target.value } : p,
    );
    setProducts(updatedProducts);
  };

  const handleSave = (product: IProduct) => {
    mutate(product);
    setEditingProductId(null); // Exit editing mode
  };

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Виникла помилка: {error.message}</p>;

  if (!data) {
    return <p>Немає товарів.</p>;
  }

  return (
    <ul className={style.productsList}>
      {products.map((product: IProduct) => (
        <li key={product._id} className={style.productCard}>
          {editingProductId === product._id ? (
            <>
              <div className={style.productInput}>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleChange(e, product)}
                />
              </div>
              <textarea
                name="description"
                value={product.description}
                onChange={(e) => handleChange(e, product)}
              />
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) => handleChange(e, product)}
              />
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={(e) => handleChange(e, product)}
              />
              <input
                type="text"
                name="forWho"
                value={product.forWho}
                onChange={(e) => handleChange(e, product)}
              />
              <input
                type="text"
                name="trending"
                value={product.trending}
                onChange={(e) => handleChange(e, product)}
              />
              <input
                type="number"
                name="rating"
                value={product.rating}
                onChange={(e) => handleChange(e, product)}
              />
              <button onClick={() => handleSave(product)}>Зберегти</button>
              <button onClick={() => setEditingProductId(null)}>
                Скасувати
              </button>
            </>
          ) : (
            <>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Ціна: {product.price} грн</p>
              <p>Категорія: {product.category}</p>
              <p>Для кого: {product.forWho}</p>
              <p>Тренд: {product.trending}</p>
              <p>Рейтинг: {product.rating}</p>
              <img
                src={product.image}
                alt={product.name}
                className={style.productImage}
              />
              <button onClick={() => handleEditClick(product)}>Змінити</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GetAndUpdateProducts;
