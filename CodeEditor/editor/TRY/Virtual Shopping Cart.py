def getQuantity():
    while True:
        try:
            quantity = int(input("Enter the quantity of the item: "))
            if quantity <=0:
                print("Quantity must be positive integer")
            else:
                return quantity
        except ValueError:
            print("Invalid Quantity")
def display(cart):
    pass
def totalCost(cart,price):
    pass
def applyDiscount(total):
    pass

def checkout(cart,price):
    display(cart)
    total = totalCost(cart,price)
    print(f"{total} before discount")
    total = applyDiscount(total)
    return total



def main():
    print("Welcome to the shopping cart. Select items")
    items = ['Apples','Mosambi','Banana','Anar','Aam']
    price={'Apples':20,'Anar': 33.5,'Aam': 45.6,'Mosambi':40,}
    cart = {}
    while  True:
        print("Available Items: ")
        for i in items:
            print(i)
        choice = input('Enter item name :  or Done if it is finished : ').capitalize().strip()
        if choice == 'Done':
            break
        elif choice in items:
            quantity = getQuantity()
            if choice in cart:
                cart[choice] += quantity
                print(f"{choice} updated by {quantity}")
            else:
                cart[choice] = 0 + quantity
                print("item added")
        else:
            print("Item not available ")
    if cart:
        print(checkout(cart,price))
    else:
        print('Empty  Cart')

main()