import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartItems, setCartItems] = useState<Array<{id: number; name: string; price: number; quantity: number}>>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products = [
    { id: 1, name: 'Футболка детская', price: 1290, category: 'Для мальчиков', age: '3-5 лет', image: 'https://cdn.poehali.dev/projects/dd06e17e-e5fd-47db-926a-4fbc4043e15c/files/2d724e11-ad66-4bdf-83c1-b33f5349d624.jpg' },
    { id: 2, name: 'Платье нарядное', price: 2490, category: 'Для девочек', age: '1-3 года', image: 'https://cdn.poehali.dev/projects/dd06e17e-e5fd-47db-926a-4fbc4043e15c/files/579f1101-041a-4c08-b2f8-ee58d4ebf3b0.jpg' },
    { id: 3, name: 'Свитер уютный', price: 1890, category: 'Унисекс', age: '5-7 лет', image: 'https://cdn.poehali.dev/projects/dd06e17e-e5fd-47db-926a-4fbc4043e15c/files/db4026b1-2fc3-4f63-bf28-9a45fe87c81d.jpg' },
    { id: 4, name: 'Джинсы комфортные', price: 1690, category: 'Для мальчиков', age: '3-5 лет', image: 'https://cdn.poehali.dev/projects/dd06e17e-e5fd-47db-926a-4fbc4043e15c/files/2d724e11-ad66-4bdf-83c1-b33f5349d624.jpg' },
    { id: 5, name: 'Юбка летняя', price: 1390, category: 'Для девочек', age: '5-7 лет', image: 'https://cdn.poehali.dev/projects/dd06e17e-e5fd-47db-926a-4fbc4043e15c/files/579f1101-041a-4c08-b2f8-ee58d4ebf3b0.jpg' },
    { id: 6, name: 'Худи стильное', price: 2190, category: 'Унисекс', age: '7-10 лет', image: 'https://cdn.poehali.dev/projects/dd06e17e-e5fd-47db-926a-4fbc4043e15c/files/db4026b1-2fc3-4f63-bf28-9a45fe87c81d.jpg' },
  ];

  const addToCart = (product: typeof products[0]) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCartItems([...cartItems, {id: product.id, name: product.name, price: product.price, quantity: 1}]);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 to-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-primary">КидсМода</h1>
          
          <nav className="hidden md:flex gap-6">
            {['Главная', 'Каталог', 'О нас', 'Доставка', 'Оплата', 'Контакты', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                      {cartItems.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle className="font-heading">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-accent/30 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">{item.price * item.quantity} ₽</p>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-heading font-semibold text-lg">Итого:</span>
                          <span className="font-heading font-bold text-xl text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">Оформить заказ</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Icon name="Menu" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="animate-slide-in-right">
                <nav className="flex flex-col gap-4 mt-6">
                  {['Главная', 'Каталог', 'О нас', 'Доставка', 'Оплата', 'Контакты', 'FAQ'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveSection(item.toLowerCase())}
                      className="text-left text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'главная' || activeSection === 'home' ? (
        <>
          <section className="container mx-auto px-4 py-16 text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Стильная одежда для детей
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Качественная детская одежда, которая радует малышей и родителей. Яркие цвета, удобные ткани, современный дизайн.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="text-lg px-8" onClick={() => setActiveSection('каталог')}>
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => setActiveSection('о нас')}>
                О нас
              </Button>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <h3 className="text-3xl font-heading font-bold text-center mb-8">Популярные категории</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Для мальчиков', 'Для девочек', 'Унисекс'].map((cat) => (
                <Card key={cat} className="overflow-hidden hover:shadow-lg transition-all hover-scale cursor-pointer" onClick={() => setActiveSection('каталог')}>
                  <CardContent className="p-8 text-center bg-gradient-to-br from-accent/50 to-transparent">
                    <Icon name="Shirt" size={48} className="mx-auto mb-4 text-primary" />
                    <h4 className="text-xl font-heading font-semibold">{cat}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      ) : activeSection === 'каталог' ? (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">Каталог товаров</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all animate-scale-in hover-scale">
                <div className="aspect-square overflow-hidden bg-accent/20">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge variant="secondary">{product.age}</Badge>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                    <Button onClick={() => addToCart(product)} size="sm">
                      <Icon name="Plus" size={16} className="mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : activeSection === 'о нас' ? (
        <section className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">О нас</h2>
          <Card>
            <CardContent className="p-8 space-y-4">
              <p className="text-lg">КидсМода — это магазин детской одежды с душой. Мы создали его для родителей, которые ценят качество, стиль и комфорт своих малышей.</p>
              <p>Наша команда тщательно отбирает каждую вещь, проверяя ткани на безопасность и гипоаллергенность. Мы работаем только с проверенными производителями.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <Icon name="Award" size={32} className="mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Качество</p>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <Icon name="Heart" size={32} className="mx-auto mb-2 text-secondary" />
                  <p className="font-semibold">С заботой</p>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <Icon name="Sparkles" size={32} className="mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Стильно</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : activeSection === 'доставка' ? (
        <section className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">Доставка</h2>
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="Truck" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Курьерская доставка</h3>
                  <p className="text-muted-foreground">По Москве — 300 ₽, бесплатно при заказе от 3000 ₽. Доставка 1-2 дня.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Package" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Пункты выдачи</h3>
                  <p className="text-muted-foreground">Более 500 пунктов по России. Доставка 3-5 дней. Стоимость от 200 ₽.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Самовывоз</h3>
                  <p className="text-muted-foreground">Бесплатно из нашего шоурума в Москве. Готов к выдаче в течение 2 часов.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : activeSection === 'оплата' ? (
        <section className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">Оплата</h2>
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="CreditCard" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Банковские карты</h3>
                  <p className="text-muted-foreground">Принимаем Visa, MasterCard, Мир. Оплата через защищенный сервер.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Wallet" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Электронные кошельки</h3>
                  <p className="text-muted-foreground">ЮMoney, QIWI, WebMoney, СБП — любой удобный способ.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Banknote" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Наличные</h3>
                  <p className="text-muted-foreground">При получении курьеру или в пункте выдачи.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : activeSection === 'контакты' ? (
        <section className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">Контакты</h2>
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground">info@kidsmoda.ru</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} className="text-primary mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Адрес шоурума</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 10</p>
                  <p className="text-sm text-muted-foreground">Пн-Вс: 10:00 - 20:00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : activeSection === 'faq' ? (
        <section className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
          <h2 className="text-4xl font-heading font-bold text-center mb-8">Вопросы и ответы</h2>
          <Card>
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-heading">Как выбрать размер?</AccordionTrigger>
                  <AccordionContent>
                    В карточке каждого товара есть таблица размеров. Рекомендуем измерить рост ребенка и объем груди/талии для точного подбора.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-heading">Можно ли вернуть товар?</AccordionTrigger>
                  <AccordionContent>
                    Да, в течение 14 дней с момента получения. Товар должен быть в неношеном состоянии с бирками.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-heading">Из каких материалов одежда?</AccordionTrigger>
                  <AccordionContent>
                    Мы используем только натуральные гипоаллергенные ткани: хлопок, лен, бамбук. Все материалы имеют сертификаты безопасности.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="font-heading">Есть ли программа лояльности?</AccordionTrigger>
                  <AccordionContent>
                    Да! При первом заказе вы получаете скидку 10%. За каждую покупку начисляются бонусы — 5% от суммы заказа.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="font-heading">Как отследить заказ?</AccordionTrigger>
                  <AccordionContent>
                    После оформления заказа вам придет SMS с трек-номером. Отслеживать можно на сайте курьерской службы или в личном кабинете.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>
      ) : null}

      <footer className="bg-foreground/5 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-heading font-bold text-lg mb-4">КидсМода</h3>
              <p className="text-sm text-muted-foreground">Стильная детская одежда для счастливого детства</p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Покупателям</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => setActiveSection('доставка')} className="block hover:text-primary transition-colors">Доставка</button>
                <button onClick={() => setActiveSection('оплата')} className="block hover:text-primary transition-colors">Оплата</button>
                <button onClick={() => setActiveSection('faq')} className="block hover:text-primary transition-colors">FAQ</button>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (495) 123-45-67</p>
                <p>info@kidsmoda.ru</p>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
            © 2024 КидсМода. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
