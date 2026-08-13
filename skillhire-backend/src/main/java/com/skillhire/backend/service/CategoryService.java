package com.skillhire.backend.service;

import com.skillhire.backend.dto.category.CategoryResponse;
import com.skillhire.backend.repository.CategoryRepository;
import com.skillhire.backend.repository.WorkerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final Mapper mapper;

   public List<CategoryResponse> getAll() {

    return categoryRepository.findAll().stream()
            .map(c -> {

                long count = workerProfileRepository
                        .findByCategory_Slug(c.getSlug())
                        .size();

                System.out.println(
                        "Category: " + c.getSlug() +
                        " -> workers = " + count
                );

                return mapper.toCategoryResponse(c, count);
            })
            .toList();
}
}
