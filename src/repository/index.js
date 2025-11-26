import { adminRepository } from "./admin.repository.js";
import { categoryRepository } from "./category.repository.js";
import { productRepository } from "./product.repository.js";
import { subcategoryRepository } from "./subcategory.repository.js";
import { userRepository } from "./user.repository.js";

export const repository = {
  read: {
    ...adminRepository.read,
    ...categoryRepository.read,
    ...userRepository.read,
    ...subcategoryRepository.read,
    ...productRepository.read,
  },

  write: {
    ...adminRepository.write,
    ...categoryRepository.write,
    ...userRepository.write,
    ...subcategoryRepository.write,
    ...productRepository.write,
  },

  update: {
    ...adminRepository.update,
    ...categoryRepository.update,
    ...userRepository.update,
    ...subcategoryRepository.update,
    ...productRepository.update,
  },

  remove: {
    ...adminRepository.remove,
    ...categoryRepository.remove,
    ...userRepository.remove,
    ...subcategoryRepository.remove,
    ...productRepository.remove,
  },
};
