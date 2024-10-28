class Items:
    def __init__(self,name,price,quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    
    def displayItems(self):
        print(f'name: {self.name} \nPrice: {self.price}\nQuantity: {self.quantity}\n')

'''
Creating an inventory
managing inventory (list of items)
methods for adding items
displaying inventory
list of object
'''

class Inventory:
    def __init__(self):
        self.items= []
    def addItems(self,name,price,quantity):
        for item in self.items:
            if item.name==name:
                print(f'{name} item is already exists! Please use different name.\n')
                break
        else: self.items.append(Items(name,price,quantity))
    def update_quantity(self,name,new_quantity):
        for item in self.items:
            if item.name==name:
                item.quantity+=new_quantity
                print("Successfully updated!\n")
                break
        else: print(f"Item {name} not found!")
    def displayItems(self):
        for item in self.items:
            item.displayItems()

Inventory1= Inventory()

Inventory1.addItems('pen',10,200)
Inventory1.addItems('pen',10,200)
Inventory1.addItems('scale',10,200)
Inventory1.addItems('box',10,200)
Inventory1.displayItems()