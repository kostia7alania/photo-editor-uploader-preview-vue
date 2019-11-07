export const loading = {
  template: `<div class="text-center">
    <div class="lds-ellipsis">
      <div></div><div></div><div></div><div></div>
    </div>
  </div>`,
  methods: {
  },
};
export const error = {
  template: `<div style="text-align:center">
    <span>. . . {{$t('ERROR')}} . . .</span>
</div>
` };
export const con = { loading, error, delay: 20, timeout: 25000 };
export default con
export const delay = 20
export const timeout = 25000