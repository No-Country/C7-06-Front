// import classes from "./PetForm.module.sass";
// import { useForm } from "../../hooks/useForm";
// import { regexConditions } from "../../helpers/regexs";
// import { useSelector } from "react-redux";
// import avatar from "../../assets/userDefault.png";
// import { useState } from "react";

const PetForm = () => {
  // const { userInfo, myPets } = useSelector(state => state.user);

  // const [pet, setPet] = useState();

  return (
    <>PetsForm</>
    // <div className={classes.form}>
    //   <h3>Perfil de mascotas</h3>
    //   <form onSubmit={handleSubmit}>
    //     <div className={classes.form_wrapper}>
    //       <div className={classes.form_info}>
    //         <div>
    //           <input
    //             name="name"
    //             placeholder="Nombre de la mascota"
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             value={form.name}
    //           />
    //           {errors?.name && <p className={classes.instructions}>{errors.name}</p>}
    //         </div>

    //         <div>
    //           <input
    //             name="age"
    //             placeholder="Edad de la mascota"
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             value={form.age}
    //           />
    //           {errors?.age && <p className={classes.instructions}>{errors.age}</p>}
    //         </div>
    //         <div>
    //           <input
    //             name="location"
    //             placeholder="Lugar de residencia"
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             value={form.location}
    //           />
    //           {errors?.location && <p className={classes.instructions}>{errors.location}</p>}
    //         </div>
    //         <div className={classes.form_group}>
    //           <textarea
    //             name="description"
    //             placeholder="Acerca de mi mascota..."
    //             // onInput={handleInput}
    //             value={form.description}
    //           />
    //           <p>
    //             <span>{characteres} caracteres restantes.</span>
    //           </p>
    //           {errors?.description && <p className={classes.instructions}>{errors.description}</p>}
    //         </div>
    //       </div>
    //       <div className={classes.form_info}></div>
    //       <div className={classes.form_avatar}>
    //         <div className={classes.form_avatar_image}>
    //           <img src={form.file || form.avatar || avatar} alt={"nombre persona"} />
    //         </div>
    //         <div className={classes.form_avatar_editButton}>
    //           <label htmlFor="avatar">Editar</label>
    //           <input
    //             id="avatar"
    //             name="avatar"
    //             onChange={handleFiles}
    //             type="file"
    //             value={form.files}
    //             hidden
    //           />
    //           {errors?.avatar && <p className={classes.instructions}>{errors.avatar}</p>}
    //         </div>
    //       </div>
    //     </div>
    //     <button type="submit" className={classes.form_submit}>
    //       Guardar
    //     </button>
    //   </form>
    // </div>
  );
};

export default PetForm;
