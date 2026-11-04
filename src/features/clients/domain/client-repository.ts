import type { Client, NewClient } from './client' // importo los tipos de client y newclient para poder usarlos en la interfaz de repository //

export interface ClientRepository {
  findAll(): Promise<Client[]>
  findById(id: string): Promise<Client | null>
  create(input: NewClient): Promise<Client>
  update(client: Client): Promise<Client>
  remove(id: string): Promise<void>
}
