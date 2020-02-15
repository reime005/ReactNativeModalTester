describe('Test App', () => {
  beforeEach(async () => {
    await device.terminateApp();
    await device.launchApp();
  });

  it('should have the modal toggle buttons', async () => {
    await expect(element(by.id('btn_flatlist_modal_toggle'))).toBeVisible();
    await expect(element(by.id('btn_scroll_modal_toggle'))).toBeVisible();
    await expect(
      element(by.id('btn_legacy_scroll_modal_toggle')),
    ).toBeVisible();
  });

  it('should scroll scrollview in modal to bottom', async () => {
    await expect(element(by.id('btn_scroll_modal_toggle'))).toBeVisible();
    await element(by.id('btn_scroll_modal_toggle')).tap();

    await expect(element(by.id('scroll_view'))).toBeVisible();

    await expect(element(by.id('scroll_item_1'))).toBeVisible();
    await expect(element(by.id('scroll_item_49'))).toBeNotVisible();

    await element(by.id('scroll_view')).scrollTo('bottom');
    await expect(element(by.id('scroll_item_49'))).toBeVisible();
  });

  it('should scroll flatlist in modal to bottom', async () => {
    await expect(element(by.id('btn_flatlist_modal_toggle'))).toBeVisible();
    await element(by.id('btn_flatlist_modal_toggle')).tap();

    await expect(element(by.id('flatlist_view'))).toBeVisible();

    await expect(element(by.id('scroll_item_1'))).toBeVisible();
    await expect(element(by.id('scroll_item_49'))).toBeNotVisible();

    await element(by.id('flatlist_view')).scrollTo('bottom');
    await expect(element(by.id('scroll_item_49'))).toBeVisible();
  });

  it('should keep modal open when scrolling up', async () => {
    await expect(
      element(by.id('btn_legacy_scroll_modal_toggle')),
    ).toBeVisible();
    await element(by.id('btn_legacy_scroll_modal_toggle')).tap();

    await expect(element(by.id('modal'))).toBeVisible();

    await element(by.id('legacy_scroll_view')).scroll(500, 'down');
    await element(by.id('legacy_scroll_view')).scroll(200, 'up');

    await expect(element(by.id('modal'))).toBeVisible();
  });
});
