import styles from "./Style/category.module.scss";
import { CategoryProps } from "./Type";

const Category = (props: CategoryProps) => {
    return (
        <div className={styles["category"]}>
            <input type="checkbox" /> <span>{props.category}</span>
        </div>
    );
};
export default Category;
