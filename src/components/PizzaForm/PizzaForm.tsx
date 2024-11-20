import { IPizzaMutation } from '../../types.ds.ts';
import { useState } from 'react';

interface Props {
  addNewPizza: (pizza: IPizzaMutation) => void;
  existingPizza?: IPizzaMutation;
  isEdit?: boolean;
}

const initialStateForm = {
  title: "",
  price: 0,
  imageUrl: "",
};

const PizzaForm: React.FC<Props> = ({addNewPizza, existingPizza = initialStateForm, isEdit = false}) => {
  const [newPizza, setNewPizza] = useState<IPizzaMutation>(existingPizza);

  const onChangeClick = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPizza((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPizza.title.trim().length === 0) {
      alert ("Fill in all the fields!");
    } else {
      addNewPizza({
        ...newPizza,
        price: Number(newPizza.price)
      });

      if (!isEdit) {
        setNewPizza({
          title: "",
          price: 0,
          imageUrl: "",
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>{isEdit ? 'Edit' : 'Add new'} pizza</h3>
        <div className="form-group mb-2">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={onChangeClick}
            value={newPizza.title}
            className="form-control"
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={onChangeClick}
            value={newPizza.price}
            className="form-control"
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="imageUrl">Image: </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            onChange={onChangeClick}
            value={newPizza.imageUrl}
            className="form-control"
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success" type="submit">Save</button>
          <button className="btn btn-danger">Back</button>
        </div>
      </form>
    </div>
  );
};

export default PizzaForm;