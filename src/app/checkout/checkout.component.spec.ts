import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { AppModule } from '../app.module';

describe('CheckoutComponent', () => {
    describe('Given a user is at The Checkout', () => {
        let component: CheckoutComponent;
        let fixture: ComponentFixture<CheckoutComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppModule]
            })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckoutComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        describe('When the page has loaded', () => {
            it('Then the component is created', () => {
                expect(component).toBeTruthy();
            })
        });

        describe('When the "Add to Cart" button is clicked', () => {
            beforeEach(() => {
                spyOn(component, 'addToCart');

                const buttonElement = fixture.debugElement.nativeElement.querySelector('#A');
                buttonElement.click();
            });

            it('Then the "addToCart" function is called', () => {
                fixture.whenStable().then(() => {
                    expect(component.addToCart('A', 0.5)).toHaveBeenCalled()
                });
            });
        });

        describe('When an item is added into the cart', () => {
            beforeEach(() => {
                component.addToCart('A', 0.5);
                fixture.detectChanges();
            });

            it('Then the Cart Total equals the item\'s price', () => {
                expect(component.cartTotal).toEqual(0.5);
            });

            it('And the Cart Contents for the Id to increment by 1', () => {
                expect(component.totalA).toEqual(1);
            })
        });

        describe('When item A is added to the cart 3 times', () => {
            beforeEach(() => {
                component.addToCart('A', 0.5);
                component.addToCart('A', 0.5);
                component.addToCart('A', 0.5);
                fixture.detectChanges();
            });

            it('Then the Cart Total takes the special offer price', () => {
                expect(component.cartTotal).toEqual(1.3);
            })
        });

        describe('When item B is added to the cart twice', () => {
            beforeEach(() => {
                component.addToCart('B', 0.3);
                component.addToCart('B', 0.3);
                fixture.detectChanges();
            });

            it('Then the Cart Total takes the special offer price', () => {
                expect(component.cartTotal).toEqual(0.45);
            })
        });

        describe('When adding different items to the cart', () => {
            beforeEach(() => {
                component.addToCart('A', 0.5);
                component.addToCart('B', 0.3);
                component.addToCart('C', 0.2);
                component.addToCart('C', 0.2);
                fixture.detectChanges();
            });

            it('Then the Cart Total correctly adds up the item values', () => {
                expect(component.cartTotal).toEqual(1.2);
            });

            it('And the Cart Contents is correct', () => {
                expect(component.totalA).toEqual(1);
                expect(component.totalB).toEqual(1);
                expect(component.totalC).toEqual(2);
                expect(component.totalD).toEqual(0);
            })
        });

        describe('When the "Reset Cart" button is clicked', () => {
            beforeEach(() => {
                spyOn(component, 'resetCart');

                const buttonElement = fixture.debugElement.nativeElement.querySelector('#reset');
                buttonElement.click();
            });

            it('Then the "resetCart" function is called', () => {
                fixture.whenStable().then(() => {
                    expect(component.resetCart()).toHaveBeenCalled()
                });
            });
        });

        describe('When clicking the "Reset Cart" button after adding items', () => {
            beforeEach(() => {
                component.addToCart('A', 0.5);
                component.addToCart('B', 0.3);
                component.addToCart('C', 0.2);
                component.addToCart('C', 0.2);
                component.resetCart();
                fixture.detectChanges();
            });

            it('Then the Cart Total resets to 0', () => {
                expect(component.cartTotal).toEqual(0)
            });

            it('And the Cart Content to all reset to 0', () => {
                expect(component.totalA).toEqual(0);
                expect(component.totalB).toEqual(0);
                expect(component.totalC).toEqual(0);
                expect(component.totalD).toEqual(0);
            })
        })
    });
});
