import { TYPES } from "@/di/types";
import type { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import type { IBookRepository } from "@/interfaces/IBookRepository";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";
import { inject, injectable } from "inversify";
