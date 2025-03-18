import { Injectable } from '@angular/core';
import { Domain } from '../models/domain';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  saveDomain(domain: Domain): void {
    localStorage.setItem(domain.domain_key, JSON.stringify(domain));
  }

  getDomain(domainKey: string): Domain | null {
    const data = localStorage.getItem(domainKey);
    return data ? JSON.parse(data) : null;
  }
}

